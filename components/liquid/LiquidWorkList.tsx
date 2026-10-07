"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from "framer-motion";
import ScrambleText from "@/components/ScrambleText";
import { createLiquidRenderer, type LiquidHandle } from "./renderer";

export type LiquidProject = {
    slug: string;
    title: string;
    description: string;
    role: string;
    year: string;
    stack: string[];
    hue: number;
};

const MotionLink = motion.create(Link);

// The work list as liquid glass: each row is a real link moved by Motion, and
// vgpu pours refracting liquid under it every frame. Neighbouring rows merge
// where they meet, a hovered row swells, the key light follows the cursor, and
// a row can be pulled and let go: it springs back and the liquid stretches.
// Without WebGPU the same rows render as plain frosted panels.
export default function LiquidWorkList({ projects }: { projects: LiquidProject[] }) {
    const stage = useRef<HTMLDivElement>(null);
    const canvas = useRef<HTMLCanvasElement>(null);
    const handles = useMemo(() => new Set<LiquidHandle>(), []);
    const [liquid, setLiquid] = useState<"pending" | "on" | "off">("pending");
    const [dragging, setDragging] = useState<string | null>(null);

    useEffect(() => {
        if (!canvas.current || !stage.current) return;
        const renderer = createLiquidRenderer(canvas.current, stage.current, handles);
        renderer.ready.then(
            () => setLiquid("on"),
            () => setLiquid("off"),
        );
        return () => renderer.dispose();
    }, [handles]);

    return (
        <div ref={stage} className="relative isolate overflow-hidden rounded-2xl bg-[#0b0c0f] p-3 sm:p-5">
            <canvas
                ref={canvas}
                aria-hidden="true"
                className={`absolute inset-0 -z-10 block h-full w-full transition-opacity duration-700 ${liquid === "on" ? "opacity-100" : "opacity-0"}`}
            />
            <ul className="flex flex-col gap-1.5">
                {projects.map((p) => (
                    <Row
                        key={p.slug}
                        project={p}
                        handles={handles}
                        frosted={liquid === "off"}
                        muted={dragging !== null && dragging !== p.slug}
                        raised={dragging === p.slug}
                        onDrag={(active) => setDragging((d) => (active ? p.slug : d === p.slug ? null : d))}
                    />
                ))}
            </ul>
        </div>
    );
}

function Row({
    project: p,
    handles,
    frosted,
    muted,
    raised,
    onDrag,
}: {
    project: LiquidProject;
    handles: Set<LiquidHandle>;
    frosted: boolean;
    /** Another row is being dragged: this one's copy steps back so the two never read through each other. */
    muted: boolean;
    raised: boolean;
    onDrag: (active: boolean) => void;
}) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const scale = useMotionValue(1);
    // A quick pass across the row tips it slightly, like a tray of liquid.
    const tilt = useTransform(useVelocity(x), [-1800, 1800], [-3, 3], { clamp: true });
    const rotate = useSpring(tilt, { stiffness: 320, damping: 24 });
    const handle = useMemo<LiquidHandle>(
        () => ({ id: p.slug, hue: p.hue, element: null, x, y, scale, rotate, hovered: false }),
        [p.slug, p.hue, x, y, scale, rotate],
    );

    // The click that ends a drag doesn't navigate; the next one does.
    const dragged = useRef(false);

    useLayoutEffect(() => {
        handles.add(handle);
        return () => void handles.delete(handle);
    }, [handles, handle]);

    return (
        <li>
            <MotionLink
                ref={(node: HTMLAnchorElement | null) => {
                    handle.element = node;
                }}
                href={`/projects/${p.slug}`}
                data-scramble
                style={{ x, y, scale, rotate, zIndex: raised ? 10 : 1 }}
                drag
                dragSnapToOrigin
                dragElastic={0.35}
                dragTransition={{ bounceStiffness: 380, bounceDamping: 18 }}
                onPointerDown={() => (dragged.current = false)}
                onDragStart={() => {
                    dragged.current = true;
                    onDrag(true);
                }}
                // Stay on top until the row has sprung back, not just until release.
                onDragTransitionEnd={() => onDrag(false)}
                onClick={(e: React.MouseEvent) => {
                    if (dragged.current) e.preventDefault();
                }}
                draggable={false}
                whileHover={{ scale: 1.018 }}
                whileTap={{ scale: 0.985 }}
                whileDrag={{ scale: 1.03, cursor: "grabbing" }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                onHoverStart={() => (handle.hovered = true)}
                onHoverEnd={() => (handle.hovered = false)}
                className={`group relative grid touch-pan-y gap-2 rounded-[11px] px-5 py-5 text-[#eceef2] outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60 sm:grid-cols-[1fr_auto] sm:gap-6 sm:px-6 [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] ${
                    frosted ? "border border-white/10 bg-white/[0.06]" : ""
                }`}
            >
                <motion.div
                    className="min-w-0"
                    animate={{ opacity: muted ? 0.25 : 1, filter: muted ? "blur(1.5px)" : "blur(0px)" }}
                    transition={{ duration: 0.2 }}
                >
                    <p className="font-mono text-micro uppercase text-white/45">
                        {p.year} · {p.role}
                    </p>
                    <p className="mt-2 text-heading font-medium">
                        <ScrambleText text={p.title} trigger="parentHover" hold={60} duration={320} />
                    </p>
                    <p className="mt-1.5 max-w-prose text-small text-white/65">{p.description}</p>
                    <p className="mt-3 font-mono text-[11px] text-white/40">{p.stack.slice(0, 5).join(" · ")}</p>
                </motion.div>
                <span className={`hidden self-start pt-1 font-mono text-micro uppercase text-white/45 transition-[color,opacity] duration-200 group-hover:text-white sm:block ${muted ? "opacity-25" : ""}`}>
                    Read ↗
                </span>
            </MotionLink>
        </li>
    );
}
