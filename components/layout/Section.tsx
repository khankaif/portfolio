import { cn } from "@/lib/utils";

/**
 * Uniform section opener: mono eyebrow (+ optional H2 and intro) over a
 * hairline divider. Replaces per-page StorySection / SectionHeading clones.
 */
export default function Section({
    label,
    title,
    intro,
    className,
    children,
}: {
    label: string;
    title?: string;
    intro?: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <section className={cn("flex flex-col gap-4", className)}>
            <div className="flex flex-col gap-2 max-w-prose">
                <span className="font-mono text-micro uppercase text-muted-foreground">
                    {label}
                </span>
                {title && (
                    <h2 className="text-heading font-medium text-foreground">{title}</h2>
                )}
                {intro && <p className="text-small text-muted-foreground">{intro}</p>}
            </div>
            <div className="w-full h-px bg-border/50" />
            <div>{children}</div>
        </section>
    );
}
