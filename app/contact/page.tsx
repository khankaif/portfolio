"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, Copy, Check } from "lucide-react";
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
                    {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                    {copied ? "Copied" : "Copy email"}
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
