import { XCircle, CheckCircle2 } from "lucide-react";

interface BeforeAfterProps {
    beforeTitle: string;
    beforeItems: string[];
    afterTitle: string;
    afterItems: string[];
}

export default function BeforeAfter({ beforeTitle, beforeItems, afterTitle, afterItems }: BeforeAfterProps) {
    const columns = [
        {
            title: beforeTitle,
            items: beforeItems,
            Icon: XCircle,
            glyph: "•",
            box: "border-destructive/20 bg-destructive/5",
            tone: "text-destructive",
            text: "text-muted-foreground",
            mark: "text-destructive/60",
        },
        {
            title: afterTitle,
            items: afterItems,
            Icon: CheckCircle2,
            glyph: "✓",
            box: "border-border/80 bg-card/60",
            tone: "text-foreground",
            text: "text-foreground/90",
            mark: "text-foreground/60",
        },
    ];

    return (
        <div className="not-prose my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {columns.map(({ title, items, Icon, glyph, box, tone, text, mark }) => (
                <div key={title} className={`rounded-xl border ${box} p-5 flex flex-col gap-3`}>
                    <div className="flex items-center gap-2">
                        <Icon size={16} className={`${tone} shrink-0`} />
                        <h4 className={`font-mono text-micro uppercase tracking-wider font-semibold ${tone}`}>{title}</h4>
                    </div>
                    <ul className="flex flex-col gap-2.5 mt-1">
                        {items.map((item, idx) => (
                            <li key={idx} className={`flex items-start gap-2 text-small ${text} leading-snug`}>
                                <span className={`${mark} font-mono text-micro select-none mt-0.5`}>{glyph}</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
