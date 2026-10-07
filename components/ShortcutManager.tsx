"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function ShortcutManager() {
    const router = useRouter();
    const lastKeyRef = useRef<{ key: string; time: number } | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore keydown when inside an input or textarea
            if (
                e.target instanceof HTMLInputElement ||
                e.target instanceof HTMLTextAreaElement ||
                e.target instanceof HTMLSelectElement
            ) {
                return;
            }

            const currentKey = e.key.toLowerCase();
            const now = Date.now();
            const last = lastKeyRef.current;

            // Wait for 'g' then 'a' or 'p' within 1000ms
            if (last && last.key === "g" && (now - last.time) < 1000) {
                if (currentKey === "a") {
                    router.push("/about");
                    // Reset to avoid double triggering
                    lastKeyRef.current = null;
                    return;
                }
                if (currentKey === "p") {
                    router.push("/projects");
                    lastKeyRef.current = null;
                    return;
                }
            }

            // Record current key
            lastKeyRef.current = { key: currentKey, time: now };
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [router]);

    return null;
}
