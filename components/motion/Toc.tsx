"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Heading = { id: string; text: string };

// Case-study contents in the left margin. The marker slides to whichever
// section you're reading; clicking jumps there.
export default function Toc() {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [active, setActive] = useState<string | null>(null);

    useEffect(() => {
        const els = Array.from(document.querySelectorAll<HTMLHeadingElement>("article h2[id]"));
        setHeadings(els.map((h) => ({ id: h.id, text: h.textContent ?? "" })));

        // The active section is the last heading that has scrolled past the top third.
        const update = () => {
            const line = window.innerHeight * 0.33;
            let current: string | null = els[0]?.id ?? null;
            for (const h of els) if (h.getBoundingClientRect().top < line) current = h.id;
            setActive(current);
        };
        update();
        window.addEventListener("scroll", update, { passive: true });
        return () => window.removeEventListener("scroll", update);
    }, []);

    if (headings.length < 3) return null;

    return (
        <nav
            aria-label="On this page"
            className="hidden xl:block fixed top-32 left-[max(1.5rem,calc(50%-34rem))] w-48"
        >
            <p className="mb-3 font-mono text-micro uppercase text-muted-foreground">On this page</p>
            <ol className="relative flex flex-col border-l border-border/60">
                {headings.map((h) => (
                    <li key={h.id} className="relative">
                        {active === h.id && (
                            <motion.span
                                layoutId="toc-marker"
                                className="absolute -left-px top-0 h-full w-px"
                                style={{ background: "var(--portfolio-accent)" }}
                                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                            />
                        )}
                        <a
                            href={`#${h.id}`}
                            className={`block py-1.5 pl-3 text-small leading-snug transition-colors ${
                                active === h.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            {h.text}
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
