"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export function AccordionSection({ title, children }: { title: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-t border-border/20">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between py-[18px] bg-transparent border-none cursor-pointer text-left"
            >
                <span className="font-sans text-[14px] font-semibold tracking-[-0.03em] text-foreground">
                    {title}
                </span>
                {open ? (
                    <Minus className="w-4 h-4 shrink-0 text-muted-foreground" />
                ) : (
                    <Plus className="w-4 h-4 shrink-0 text-muted-foreground" />
                )}
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-[500px] opacity-100 pb-5" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="font-sans text-[14px] font-medium leading-[1.7] tracking-[-0.02em] text-muted-foreground">
                    {children}
                </div>
            </div>
        </div>
    );
}
