"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import ScrambleText from "@/components/ScrambleText";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

// ── Terminal-styled inputs ────────────────────────────────────────────────────
function TerminalInput({
    label,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
    return (
        <div className="flex flex-col gap-1.5 flex-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground/60 select-none">
                {label}
            </span>
            <div className="terminal-field flex items-center gap-2 border border-border/50 rounded-sm bg-background px-3 h-10 transition-all duration-200">
                <span
                    className="font-mono text-[13px] select-none shrink-0 leading-none"
                    style={{ color: "var(--portfolio-accent)" }}
                >
                    ›
                </span>
                <input
                    {...props}
                    className="flex-1 bg-transparent font-mono text-[13px] outline-none text-foreground placeholder:text-muted-foreground/35"
                />
            </div>
        </div>
    );
}

function TerminalTextarea({
    label,
    ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
    return (
        <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground/60 select-none">
                {label}
            </span>
            <div className="terminal-field flex items-start gap-2 border border-border/50 rounded-sm bg-background px-3 pt-2.5 pb-2 transition-all duration-200">
                <span
                    className="font-mono text-[13px] select-none shrink-0 mt-[1px] leading-none"
                    style={{ color: "var(--portfolio-accent)" }}
                >
                    ›
                </span>
                <textarea
                    {...props}
                    className="flex-1 bg-transparent font-mono text-[13px] outline-none text-foreground placeholder:text-muted-foreground/35 resize-y min-h-[100px]"
                />
            </div>
        </div>
    );
}

// ── FAQ data ──────────────────────────────────────────────────────────────────
const FAQS = [
    {
        q: "What types of projects do you work on?",
        a: "I work on end-to-end product development — from UI/UX design through frontend engineering. I specialise in enterprise B2B platforms, SaaS products, and design systems using React, TypeScript, and modern frontend stacks.",
    },
    {
        q: "How can we start working together?",
        a: "Simply fill out the form or drop me an email. I'll get back within 48 hours to schedule an intro call and discuss your goals.",
    },
    {
        q: "Do you handle both design and development?",
        a: "Yes — that's my core strength. I operate as a Product Engineer: research, design, build, and deploy. No handoffs, no translation loss.",
    },
];

// ── Social data ───────────────────────────────────────────────────────────────
const SOCIALS = [
    {
        label: "GitHub",
        href: "https://github.com/khankaif",
        icon: <Github size={18} aria-hidden="true" />,
    },
    {
        label: "LinkedIn",
        href: "https://linkedin.com/in/kaif-khan", // TODO: update with your actual LinkedIn URL
        icon: <Linkedin size={18} aria-hidden="true" />,
    },
    {
        label: "X / Twitter",
        href: "https://x.com", // TODO: update with your actual X handle
        icon: <Twitter size={18} aria-hidden="true" />,
    },
];

// ── Main component ────────────────────────────────────────────────────────────
export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
        const body = encodeURIComponent(
            `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
        );
        window.location.href = `mailto:kaifkhan9619@gmail.com?subject=${subject}&body=${body}`;
        setSent(true);
    }

    return (
        <div className="min-h-screen px-6 pt-20 pb-32 flex flex-col items-center gap-16">

            {/* ── Section: Form ─────────────────────────────────────────────── */}
            <motion.section
                className="w-full max-w-xl flex flex-col gap-8"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >

                {/* Heading */}
                <span className="flex items-center gap-3 flex-wrap text-[clamp(1.6rem,4.5vw,2rem)] font-medium tracking-tight leading-none text-foreground">
                    Get in

                    {/* Message Bubble Icon */}
                    <a
                        href="mailto:kaifkhan9619@gmail.com"
                        aria-label="Email me"
                        className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-foreground text-background shrink-0 shadow-sm hover:scale-105 transition-transform"
                    >
                        <Mail size={16} aria-hidden="true" />
                    </a>

                    <ScrambleText text="touch" trigger="inView" hold={420} duration={750} />
                </span>

                {/* Subtext */}
                <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                    I&apos;m always open to collaborating on exciting projects with great people. Let&apos;s bring your idea to life — drop me a message at{" "}
                    <a href="mailto:kaifkhan9619@gmail.com" className="text-foreground font-medium underline underline-offset-4 hover:text-muted-foreground transition-colors">
                        kaifkhan9619@gmail.com
                    </a>
                </p>

                {/* Form */}
                {sent ? (
                    <div className="p-5 rounded-sm border border-border/40 bg-muted/20 flex items-center gap-3">
                        <span className="font-mono text-[13px]" style={{ color: "var(--portfolio-accent)" }}>›</span>
                        <p className="font-mono text-[13px] text-foreground">
                            Sent. I&apos;ll reply within 48h.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <TerminalInput
                                type="text"
                                required
                                placeholder="your name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                label="name"
                            />
                            <TerminalInput
                                type="email"
                                required
                                placeholder="your email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                label="email"
                            />
                        </div>
                        <TerminalTextarea
                            required
                            placeholder="what are we building?"
                            rows={5}
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            label="message"
                        />
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full sm:w-fit mt-1 rounded-sm font-mono font-medium px-8 tracking-wide"
                        >
                            Send message
                            <span className="ml-2 opacity-50">↵</span>
                        </Button>
                    </form>
                )}
            </motion.section>

            {/* ── Section: FAQs ─────────────────────────────────────────────── */}
            <motion.section
                className="w-full max-w-xl flex flex-col gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="text-center sm:text-left">
                    <h2 className="mb-2 text-[clamp(1.4rem,3vw,1.75rem)] font-medium tracking-[-0.03em] text-foreground">FAQs</h2>
                    <p className="text-[13.5px] text-muted-foreground leading-relaxed">
                        Questions people usually ask before reaching out:
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    {FAQS.map((f, i) => (
                        <AccordionItem
                            key={i}
                            value={`item-${i}`}
                            className="border-b border-border/40"
                        >
                            <AccordionTrigger className="hover:no-underline text-[14px] font-medium text-foreground py-5 text-left transition-colors hover:text-muted-foreground">
                                {f.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-[14px] text-muted-foreground leading-relaxed pb-5 pt-0">
                                {f.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </motion.section>

            {/* ── Section: Socials ──────────────────────────────────────────── */}
            <motion.section
                className="w-full max-w-xl flex flex-col gap-4 items-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="flex gap-3 flex-wrap justify-center">
                    {SOCIALS.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit my ${s.label}`}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-md text-muted-foreground text-[13px] font-medium border border-border/40 transition-colors hover:bg-foreground hover:text-background hover:border-foreground"
                        >
                            {s.icon}
                            <span>{s.label}</span>
                        </a>
                    ))}
                </div>
            </motion.section>

        </div>
    );
}