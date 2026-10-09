import { Lock, Globe } from "lucide-react";

export default function BrowserFrame({
    url = "https://app.univdiam.com",
    children,
}: {
    url?: string;
    children: React.ReactNode;
}) {
    return (
        <figure className="not-prose my-8 overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm">
            {/* Browser Chrome Header */}
            <div className="flex h-10 items-center justify-between border-b border-border/60 bg-muted/40 px-4">
                {/* Traffic lights */}
                <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-border" />
                    <span className="size-2.5 rounded-full bg-border" />
                    <span className="size-2.5 rounded-full bg-border" />
                </div>

                {/* URL Bar */}
                <div className="flex items-center gap-1.5 rounded-md border border-border/50 bg-background/80 px-3 py-1 font-mono text-[11px] text-muted-foreground max-w-sm w-full mx-auto justify-center">
                    <Lock size={10} className="text-muted-foreground/70" />
                    <span className="truncate">{url}</span>
                </div>

                {/* Right controls placeholder */}
                <div className="w-10 flex justify-end">
                    <Globe size={13} className="text-muted-foreground/40" />
                </div>
            </div>

            {/* Viewport Content */}
            <div className="relative w-full overflow-hidden bg-background">
                {children}
            </div>
        </figure>
    );
}
