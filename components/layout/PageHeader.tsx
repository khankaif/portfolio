"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/**
 * Uniform page opener: numbered mono eyebrow + title (+ optional lede).
 * Every route starts with this so the site reads as one indexed system.
 */
export default function PageHeader({
    index,
    label,
    title,
    lede,
}: {
    index: string;
    label: string;
    title: React.ReactNode;
    lede?: React.ReactNode;
}) {
    return (
        <motion.header
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
        >
            <div className="flex items-center gap-2 font-mono text-micro uppercase text-muted-foreground">
                <span style={{ color: "var(--portfolio-accent)" }}>{index}</span>
                <span>/ {label}</span>
            </div>
            <h1 className="text-title font-medium text-foreground">{title}</h1>
            {lede && (
                <p className="text-body text-muted-foreground max-w-prose mt-1">
                    {lede}
                </p>
            )}
        </motion.header>
    );
}
