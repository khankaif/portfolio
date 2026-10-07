"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

// Each word brightens as the paragraph scrolls up through the viewport.
export default function WordReveal({ text, className }: { text: string; className?: string }) {
    const ref = useRef<HTMLParagraphElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
    const words = text.split(" ");

    return (
        <p ref={ref} className={className}>
            {words.map((w, i) => (
                <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                    {w}
                </Word>
            ))}
        </p>
    );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
    const opacity = useTransform(progress, range, [0.2, 1]);
    return (
        <motion.span style={{ opacity }} className="inline">
            {children}{" "}
        </motion.span>
    );
}
