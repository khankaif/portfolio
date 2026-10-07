"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// Fenced code in case studies: language tab, copy button, horizontal scroll.
export default function CodeBlock(props: React.ComponentProps<"pre">) {
    const ref = useRef<HTMLPreElement>(null);
    const [copied, setCopied] = useState(false);
    const child = props.children as React.ReactElement<{ className?: string }> | undefined;
    const lang = child?.props?.className?.replace("language-", "") ?? "";

    async function copy() {
        try {
            await navigator.clipboard.writeText(ref.current?.innerText ?? "");
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // Clipboard blocked; the text is still selectable.
        }
    }

    return (
        <div className="group my-6 overflow-hidden rounded-md border border-border/60 bg-muted/30">
            <div className="flex h-9 items-center justify-between border-b border-border/60 px-3">
                <span className="font-mono text-micro uppercase text-muted-foreground">{lang || "text"}</span>
                <button
                    type="button"
                    onClick={copy}
                    aria-label={copied ? "Copied" : "Copy code"}
                    className="flex h-6 items-center gap-1.5 rounded-sm px-2 text-micro font-mono uppercase text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={copied ? "done" : "copy"}
                            className="flex items-center gap-1.5"
                            initial={{ opacity: 0, scale: 0.6, filter: "blur(2px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 0.6, filter: "blur(2px)" }}
                            transition={{ duration: 0.15 }}
                        >
                            {copied ? <Check size={12} className="text-[var(--portfolio-accent)]" /> : <Copy size={12} />}
                            {copied ? "Copied" : "Copy"}
                        </motion.span>
                    </AnimatePresence>
                </button>
            </div>
            <pre
                {...props}
                ref={ref}
                className="overflow-x-auto p-4 text-small leading-relaxed [&>code]:bg-transparent [&>code]:p-0"
            />
        </div>
    );
}
