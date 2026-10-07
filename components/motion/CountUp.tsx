"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

// Counts every number in a stat string up when it scrolls into view, keeping
// the surrounding text ("%", "+", "→") as is. In "14 → 63" the right side
// counts from 14, so the change itself is what animates.
export default function CountUp({ value }: { value: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-15% 0px" });
    const reduce = useReducedMotion();

    useEffect(() => {
        const el = ref.current;
        if (!el || !inView || reduce) return;

        const parts = value.split(/(\d+(?:\.\d+)?)/);
        const numbers = parts.map((p, i) => (i % 2 ? Number(p) : null));
        if (!numbers.some((n) => n !== null)) return;

        const arrow = value.indexOf("→");
        const starts = parts.map((p, i) => {
            if (i % 2 === 0) return 0;
            const before = parts.slice(0, i).join("").length;
            const from = arrow !== -1 && before > arrow ? (numbers.find((n) => n !== null) ?? 0) : 0;
            return from;
        });

        const controls = animate(0, 1, {
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (t) => {
                el.textContent = parts
                    .map((p, i) => {
                        const n = numbers[i];
                        if (n === null) return p;
                        const decimals = p.includes(".") ? p.split(".")[1].length : 0;
                        return (starts[i] + (n - starts[i]) * t).toFixed(decimals);
                    })
                    .join("");
            },
        });
        return () => controls.stop();
    }, [inView, reduce, value]);

    return (
        <span ref={ref} className="tabular-nums">
            {value}
        </span>
    );
}
