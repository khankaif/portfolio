"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Copy, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import PageShell from "@/components/layout/PageShell";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/layout/Section";

const EMAIL = "kaifkhan9619@gmail.com";

const SOCIALS = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/khankaif/", icon: Linkedin },
    { label: "GitHub", href: "https://github.com/khankaif", icon: Github },
];

export default function ContactPage() {
    const [copied, setCopied] = useState(false);

    async function copy() {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard blocked — the mailto link next to it still works.
        }
    }

    return (
        <PageShell width="content">
            <PageHeader
                index="04"
                label="Contact"
                title="Let's talk."
                lede="I'm looking for Product Engineer roles in India, the EU, the US or Canada — on-site or remote. If you're hiring, or want to dig into anything on this site, email is the fastest way to reach me. I reply within two days."
            />

            <MumbaiTime />

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <a
                    href={`mailto:${EMAIL}`}
                    className="inline-flex items-center gap-3 h-12 px-5 rounded-full bg-foreground text-background text-body font-medium hover:opacity-90 transition-opacity"
                >
                    <Mail size={18} aria-hidden="true" />
                    {EMAIL}
                </a>
                <button
                    onClick={copy}
                    className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full border border-border text-small font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={copied ? "done" : "copy"}
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, y: 6, filter: "blur(2px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -6, filter: "blur(2px)" }}
                            transition={{ duration: 0.16 }}
                        >
                            {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                            {copied ? "Copied" : "Copy email"}
                        </motion.span>
                    </AnimatePresence>
                </button>
            </div>

            <Section label="Elsewhere">
                <div className="flex gap-3 flex-wrap">
                    {SOCIALS.map(({ label, href, icon: Icon }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2.5 rounded-sm text-muted-foreground text-small font-medium border border-border/60 transition-colors hover:bg-foreground hover:text-background hover:border-foreground"
                        >
                            <Icon size={18} aria-hidden="true" />
                            {label}
                        </a>
                    ))}
                </div>
            </Section>
        </PageShell>
    );
}

// Recruiters are often hours away; show what time it is for me right now.
function MumbaiTime() {
    const [now, setNow] = useState<Date | null>(null);

    useEffect(() => {
        setNow(new Date());
        const id = setInterval(() => setNow(new Date()), 30_000);
        return () => clearInterval(id);
    }, []);

    if (!now) return <p className="h-6" aria-hidden="true" />;

    const time = now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit" });
    const hour = Number(now.toLocaleString("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", hour12: false }));
    const awake = hour >= 9 && hour < 23;

    return (
        <p className="flex items-center gap-2 text-small text-muted-foreground">
            <span
                className={`size-2 rounded-full ${awake ? "bg-[var(--portfolio-accent)] animate-pulse" : "bg-muted-foreground/40"}`}
                aria-hidden="true"
            />
            It&apos;s {time} in Mumbai. {awake ? "I'm likely around." : "I'm probably asleep, but email anyway."}
        </p>
    );
}
