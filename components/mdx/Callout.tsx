import { ShieldAlert, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = { security: ShieldAlert, insight: Lightbulb };

export default function Callout({
    type,
    title,
    children,
}: {
    type: keyof typeof icons;
    title: string;
    children: React.ReactNode;
}) {
    const Icon = icons[type];
    const security = type === "security";

    return (
        <aside
            className={cn(
                "not-prose my-6 rounded-xl border border-border/80 bg-muted/30 p-5 flex flex-col gap-2.5",
                security && "border-destructive/30 bg-destructive/5",
            )}
        >
            <div className="flex items-center gap-2">
                <Icon size={16} className={cn("shrink-0 text-foreground", security && "text-destructive")} />
                <h4 className={cn("font-mono text-micro uppercase tracking-wider font-semibold text-foreground", security && "text-destructive")}>
                    {title}
                </h4>
            </div>
            <div className="text-small text-muted-foreground leading-relaxed pl-6">
                {children}
            </div>
        </aside>
    );
}
