"use client";

import React, { useEffect, useRef, useMemo } from "react";
import Matter from "matter-js";

interface SkillItem {
    title: string;
    href: string;
    logoSrcs?: string[];
}

const PILL_H = 56;
const PILL_W_LOGO = 84; // physics body width for single-logo chips
const LOGO_SIZE = 30;   // px, img height inside chip
const CHAMFER_R = 14;   // rounded-2xl equivalent

export default function PhysicsSkills({ items }: { items: SkillItem[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const pillRefs = useRef<(HTMLDivElement | null)[]>([]);
    const rafRef = useRef<number>(0);
    const engineRef = useRef<Matter.Engine | null>(null);

    const pills = useMemo(
        () =>
            items.map((item) => ({
                title: item.title,
                href: item.href,
                logoSrcs: item.logoSrcs,
                // logo pill: fixed collision body; text pill: char-based
                width: item.logoSrcs
                    ? PILL_W_LOGO
                    : Math.max(item.title.length * 8.5 + 52, 90),
                height: PILL_H,
            })),
        [items]
    );

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    init();
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(container);

        let cleanupListeners: (() => void) | null = null;

        return () => {
            observer.disconnect();
            cancelAnimationFrame(rafRef.current);
            if (engineRef.current) Matter.Engine.clear(engineRef.current);
            cleanupListeners?.();
        };

        function init() {
            const W = container!.clientWidth;
            const H = container!.clientHeight;

            const engine = Matter.Engine.create();
            engineRef.current = engine;

            const T = 80;
            const ground = Matter.Bodies.rectangle(W / 2, H + T / 2, W * 3, T, { isStatic: true });
            const wallL = Matter.Bodies.rectangle(-T / 2, H / 2, T, H * 3, { isStatic: true });
            const wallR = Matter.Bodies.rectangle(W + T / 2, H / 2, T, H * 3, { isStatic: true });

            const skillBodies = pills.map((pill, i) => {
                const x = Math.random() * (W - pill.width) + pill.width / 2;
                const y = -60 - i * 55;
                return Matter.Bodies.rectangle(x, y, pill.width, pill.height, {
                    chamfer: { radius: pill.logoSrcs ? CHAMFER_R : pill.height / 2 },
                    restitution: 0.35,
                    friction: 0.4,
                    render: { visible: false },
                });
            });

            const mouse = Matter.Mouse.create(container!);
            const mw = (mouse as any).mousewheel as EventListener;
            (mouse.element as HTMLElement).removeEventListener("mousewheel", mw);
            (mouse.element as HTMLElement).removeEventListener("DOMMouseScroll", mw);

            const mouseConstraint = Matter.MouseConstraint.create(engine, {
                mouse,
                constraint: { stiffness: 0.2, render: { visible: false } },
            });

            Matter.World.add(engine.world, [ground, wallL, wallR, ...skillBodies, mouseConstraint]);

            let isClick = false;
            const onDown = () => (isClick = true);
            const onMove = () => (isClick = false);
            container!.addEventListener("mousedown", onDown);
            container!.addEventListener("mousemove", onMove);
            cleanupListeners = () => {
                container!.removeEventListener("mousedown", onDown);
                container!.removeEventListener("mousemove", onMove);
            };

            Matter.Events.on(mouseConstraint, "mouseup", (event: any) => {
                const mc = event.source as Matter.MouseConstraint;
                if (!(mc as any).bodyB && isClick) {
                    const pos = mc.mouse.position;
                    skillBodies.forEach((body, i) => {
                        if (Matter.Bounds.contains(body.bounds, pos)) {
                            const href = pills[i]?.href;
                            if (href && href !== "#") window.open(href, "_blank");
                        }
                    });
                }
            });

            Matter.Runner.run(Matter.Runner.create(), engine);

            function sync() {
                skillBodies.forEach((body, i) => {
                    const el = pillRefs.current[i];
                    if (!el) return;
                    const { x, y } = body.position;
                    el.style.transform = `translate(${x - pills[i].width / 2}px, ${y - pills[i].height / 2}px) rotate(${body.angle}rad)`;
                });
                rafRef.current = requestAnimationFrame(sync);
            }
            rafRef.current = requestAnimationFrame(sync);
        }
    }, [pills]);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[120px] cursor-grab active:cursor-grabbing select-none"
        >
            {pills.map((pill, i) => (
                <div
                    key={pill.title}
                    ref={(el) => { pillRefs.current[i] = el; }}
                    className={`absolute flex items-center justify-center pointer-events-none ${pill.logoSrcs
                        ? "rounded-2xl bg-card border border-border/60 overflow-hidden"
                        : "rounded-full bg-foreground text-background"
                        }`}
                    style={{
                        width: pill.width,
                        height: pill.height,
                        transform: "translate(-9999px, -9999px)",
                        willChange: "transform",
                    }}
                >
                    {pill.logoSrcs ? (
                        pill.logoSrcs.map((src) => (
                            <img
                                key={src}
                                src={src}
                                alt={pill.title}
                                style={{ maxHeight: LOGO_SIZE, maxWidth: pill.width - 20, width: "auto" }}
                                className="object-contain"
                            />
                        ))
                    ) : (
                        <span className="text-[12px] font-medium leading-none whitespace-nowrap">
                            {pill.title}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}
