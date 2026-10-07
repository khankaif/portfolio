// A slimmed version of the Liquid Layout renderer from vgpu (MIT, Vercel Labs),
// without the demo's GUI and autoplay script.
//
// Motion owns the frame: after it writes styles, this reads each registered
// element's on-screen rect and motion values, turns them into liquid and
// renders in the same browser frame. React never re-renders per frame.

import { cancelFrame, frame as motionFrame, frameData, type MotionValue } from "framer-motion";
import { clock, frame, init, surface, type Gpu, type Surface } from "vgpu";

import { clamp, createDynamics, type CardSample, type Dynamics } from "./liquid-dynamics";
import { createPipeline, type LiquidPipeline } from "./liquid-pipeline";

export interface LiquidHandle {
    readonly id: string;
    /** 0 pale blue, 1 lavender; merging blobs blend through violet. */
    readonly hue: number;
    element: HTMLElement | null;
    readonly x: MotionValue<number>;
    readonly y: MotionValue<number>;
    readonly scale: MotionValue<number>;
    readonly rotate: MotionValue<number>;
    hovered: boolean;
}

const MAX_DPR = 2;
const LIGHT_HEIGHT = 380;

function sample(handles: Iterable<LiquidHandle>, origin: { left: number; top: number }): CardSample[] {
    const samples: CardSample[] = [];
    for (const h of handles) {
        const rect = h.element?.getBoundingClientRect();
        if (!rect || rect.width < 1 || rect.height < 1) continue;
        const rotation = (h.rotate.get() * Math.PI) / 180;
        // The rect is the rotated element's bounding box; undo the rotation to recover its size.
        const c = Math.abs(Math.cos(rotation));
        const s = Math.abs(Math.sin(rotation));
        const det = c * c - s * s;
        let width = rect.width;
        let height = rect.height;
        if (det > 0.3) {
            width = Math.max(1, (rect.width * c - rect.height * s) / det);
            height = Math.max(1, (rect.height * c - rect.width * s) / det);
        }
        samples.push({
            id: h.id,
            layer: "grid",
            cx: rect.left - origin.left + rect.width / 2,
            cy: rect.top - origin.top + rect.height / 2,
            hw: width / 2,
            hh: height / 2,
            rotation,
            offsetX: h.x.get(),
            offsetY: h.y.get(),
            scale: h.scale.get(),
            hue: h.hue,
            present: true,
            hovered: h.hovered,
            lifted: false,
        });
    }
    return samples;
}

/** Resolves once the GPU is ready; rejects where WebGPU is unavailable, so the caller can fall back. */
export function createLiquidRenderer(canvas: HTMLCanvasElement, container: HTMLElement, handles: Set<LiquidHandle>) {
    let disposed = false;
    let gpu: Gpu | undefined;
    let output: Surface | undefined;
    let pipeline: LiquidPipeline | undefined;
    let dynamics: Dynamics | undefined;
    let ticking = false;
    let visible = true;
    let time = 0;
    let origin = { left: 0, top: 0, width: 0, height: 0 };
    let pointer: { x: number; y: number } | null = null;
    const light = { x: 0, y: 0, placed: false };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onPointerMove = (e: PointerEvent) => {
        pointer = { x: e.clientX - origin.left, y: e.clientY - origin.top };
    };
    const onPointerLeave = () => (pointer = null);
    const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));

    // The key light follows the cursor; without one it drifts across the top.
    const updateLight = (dt: number) => {
        const orbit = time * (reduced.matches ? 0.08 : 0.22);
        const tx = pointer ? pointer.x : origin.width * (0.5 + 0.34 * Math.cos(orbit));
        const ty = pointer ? pointer.y : origin.height * (0.18 + 0.1 * Math.sin(orbit * 1.7));
        if (!light.placed) Object.assign(light, { x: tx, y: ty, placed: true });
        const follow = 1 - Math.exp(-dt / (pointer ? 0.09 : 0.6));
        light.x += (tx - light.x) * follow;
        light.y += (ty - light.y) * follow;
    };

    const render = () => {
        if (disposed || !visible || !gpu || !output || !pipeline || !dynamics) return;
        const dt = clamp(frameData.delta, 0, 50) / 1000;
        clock(gpu).advance(dt);
        time += dt;

        const rect = canvas.getBoundingClientRect();
        const resized = rect.width !== origin.width || rect.height !== origin.height;
        origin = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
        if (origin.width < 1 || origin.height < 1) return;

        updateLight(dt);
        const liquid = dynamics.update(sample(handles, origin), dt, [origin.width, origin.height], resized);
        pipeline.update({ liquid, light: [light.x, light.y, LIGHT_HEIGHT], dim: 0 });
        const target = output;
        const chain = pipeline;
        frame(gpu, (f) => chain.encode(f, target));
    };

    const tick = () => {
        try {
            render();
        } catch (error) {
            dispose();
            queueMicrotask(() => {
                throw error;
            });
        }
    };

    const dispose = () => {
        if (disposed) return;
        disposed = true;
        if (ticking) cancelFrame(tick);
        observer.disconnect();
        container.removeEventListener("pointermove", onPointerMove);
        container.removeEventListener("pointerleave", onPointerLeave);
        try {
            gpu?.dispose();
        } catch {
            // Teardown must finish even if the device is already lost.
        }
    };

    const ready = (async () => {
        if (!("gpu" in navigator)) throw new Error("WebGPU is not available");
        const next = await init();
        if (disposed) return next.dispose();
        gpu = next;
        output = surface(gpu, canvas, { dpr: [1, MAX_DPR] });
        dynamics = createDynamics({ smoothness: 1, reducedMotion: reduced.matches });
        pipeline = createPipeline(gpu, output.size, output.dpr);
        await pipeline.prewarm(output);
        if (disposed) return;

        const chain = pipeline;
        output.onResize(({ width, height, dpr }) => chain.resize([width, height], dpr));
        container.addEventListener("pointermove", onPointerMove);
        container.addEventListener("pointerleave", onPointerLeave);
        observer.observe(canvas);
        motionFrame.postRender(tick, true);
        ticking = true;
    })();

    return { ready, dispose };
}
