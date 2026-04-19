"use client";

import { useEffect, useRef, useCallback } from "react";

// Uppercase-biased pool — reads as encrypted data, not broken text
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@!%*/:;<=>?[]^_|~";

// 12fps — each scrambled character is visible ~83ms, long enough to read as "encrypted"
const FRAME_MS = 1000 / 12;

export interface ScrambleTextProps {
    text: string;
    className?: string;
    /** mount — once on load | hover — on mouse enter | inView — once on viewport entry */
    trigger?: "mount" | "hover" | "inView";
    /** How long to hold the fully-scrambled state before resolving (ms) */
    hold?: number;
    /** How long the left-to-right character resolve takes (ms) */
    duration?: number;
    /** Delay before animation starts (ms) — use when parent has its own enter animation */
    delay?: number;
}

export default function ScrambleText({
    text,
    className,
    trigger = "inView",
    hold = 500,
    duration = 1100,
    delay = 0,
}: ScrambleTextProps) {
    const ref        = useRef<HTMLSpanElement>(null);
    const frameRef   = useRef<number>(0);
    const timerRef   = useRef<ReturnType<typeof setTimeout>>();
    const lastFrame  = useRef<number>(0);
    const playedRef  = useRef(false);

    const scramble = useCallback(() => {
        cancelAnimationFrame(frameRef.current);
        clearTimeout(timerRef.current);
        if (!ref.current) return;

        // Show fully-scrambled immediately (no blank frame on start)
        const toScrambled = () => {
            let out = "";
            for (const ch of text) {
                out += ch === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)];
            }
            return out;
        };
        ref.current.textContent = toScrambled();

        // Each character resolves at: hold + (position / length) * duration + jitter
        const resolveTimes = Array.from(text).map((ch, i) => {
            if (ch === " ") return 0;
            const base   = hold + (i / Math.max(text.length - 1, 1)) * duration;
            const jitter = (Math.random() - 0.5) * 70;
            return Math.max(hold, base + jitter);
        });

        const start = performance.now();
        lastFrame.current = start;

        const animate = (now: number) => {
            if (!ref.current) return;

            // Throttle to ~12fps — the encrypted characters need to be legible
            if (now - lastFrame.current < FRAME_MS) {
                frameRef.current = requestAnimationFrame(animate);
                return;
            }
            lastFrame.current = now;

            const elapsed = now - start;
            let out = "";
            let done = true;

            for (let i = 0; i < text.length; i++) {
                const ch = text[i];
                if (ch === " " || elapsed >= resolveTimes[i]) {
                    out += ch;
                } else {
                    out += CHARS[Math.floor(Math.random() * CHARS.length)];
                    done = false;
                }
            }

            ref.current.textContent = out;

            if (!done) {
                frameRef.current = requestAnimationFrame(animate);
            } else {
                ref.current.textContent = text;
            }
        };

        frameRef.current = requestAnimationFrame(animate);
    }, [text, hold, duration]);

    const play = useCallback(() => {
        if (delay > 0) {
            timerRef.current = setTimeout(scramble, delay);
        } else {
            scramble();
        }
    }, [delay, scramble]);

    // mount
    useEffect(() => {
        if (trigger !== "mount") return;
        play();
        return () => { cancelAnimationFrame(frameRef.current); clearTimeout(timerRef.current); };
    }, [trigger, play]);

    // inView — fires once, then cleans up observer
    useEffect(() => {
        if (trigger !== "inView") return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !playedRef.current) {
                    playedRef.current = true;
                    play();
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        const el = ref.current;
        if (el) observer.observe(el);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(frameRef.current);
            clearTimeout(timerRef.current);
        };
    }, [trigger, play]);

    return (
        <span
            ref={ref}
            className={className}
            onMouseEnter={trigger === "hover" ? play : undefined}
        >
            {text}
        </span>
    );
}
