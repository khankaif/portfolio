"use client";

import { cn } from "@/lib/utils";

/** Shared shell for the interactive case-study demos: caption, controls, stage. */
export default function DemoFrame({
    title,
    hint,
    controls,
    children,
    className,
}: {
    title: string;
    hint: string;
    controls: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <figure className={cn("not-prose my-10 rounded-md border border-border/60 bg-background/70 backdrop-blur-sm overflow-hidden", className)}>
            <figcaption className="flex flex-col gap-3 border-b border-border/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                    <p className="text-small font-medium text-foreground">{title}</p>
                    <p className="text-small text-muted-foreground">{hint}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:shrink-0">{controls}</div>
            </figcaption>
            <div className="p-4">{children}</div>
        </figure>
    );
}

export function DemoButton({
    children,
    onClick,
    disabled,
    primary,
}: {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    primary?: boolean;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "h-8 px-3 rounded-sm text-small font-medium transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--portfolio-accent)]",
                primary ? "bg-foreground text-background hover:opacity-90" : "border border-border text-foreground hover:bg-muted",
            )}
        >
            {children}
        </button>
    );
}

export function DemoToggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
    return (
        <label className="inline-flex h-8 items-center gap-2 rounded-sm border border-border px-3 text-small text-foreground cursor-pointer select-none">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="accent-[var(--portfolio-accent)]"
            />
            {label}
        </label>
    );
}

export function LogLine({ t, children, tone }: { t: string; children: React.ReactNode; tone?: "bad" | "good" }) {
    return (
        <li className="grid grid-cols-[3.5rem_1fr] gap-2 font-mono text-[12px] leading-relaxed">
            <span className="text-muted-foreground tabular-nums">{t}</span>
            <span className={tone === "bad" ? "text-red-500" : tone === "good" ? "text-[var(--portfolio-accent)]" : "text-foreground/80"}>
                {children}
            </span>
        </li>
    );
}
