"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

type Entry = { when: string; role: string; org: string; text: string; current?: boolean };

// Experience as a commit graph: one branch line that fills with the accent as
// you scroll through it; the current role is the HEAD node.
export default function Timeline({ entries }: { entries: Entry[] }) {
    const ref = useRef<HTMLOListElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
    const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

    return (
        <ol ref={ref} className="relative flex flex-col">
            <span aria-hidden className="absolute left-[5px] top-2 bottom-2 w-px bg-border" />
            <motion.span
                aria-hidden
                className="absolute left-[5px] top-2 bottom-2 w-px origin-top"
                style={{ scaleY: fill, background: "var(--portfolio-accent)" }}
            />

            {entries.map((e) => (
                <li key={e.role + e.when} className="relative grid gap-1 py-4 pl-8 sm:grid-cols-[110px_1fr] sm:gap-6">
                    <span
                        aria-hidden
                        className={`absolute left-0 top-[1.4rem] size-[11px] rounded-full border-2 bg-background ${e.current ? "border-[var(--portfolio-accent)]" : "border-border"}`}
                    />
                    <span className="font-mono text-micro uppercase text-muted-foreground pt-1">
                        {e.when}
                        {e.current && <span className="ml-2 text-[var(--portfolio-accent)]">HEAD</span>}
                    </span>
                    <div>
                        <p className="text-body font-medium text-foreground">{e.role}</p>
                        <p className="text-small text-muted-foreground">{e.org}</p>
                        {e.text && <p className="mt-2 text-small text-muted-foreground max-w-prose">{e.text}</p>}
                    </div>
                </li>
            ))}
        </ol>
    );
}
