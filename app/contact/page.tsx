"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

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

                    touch
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
                    <div className="p-6 rounded-xl bg-muted text-center text-sm font-medium text-foreground">
                        ✅ Message sent! I&apos;ll get back to you soon.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Top row */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Input
                                type="text"
                                required
                                placeholder="Full name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="bg-background border-border/60 focus-visible:border-foreground focus-visible:ring-0 rounded-md text-[14px] h-11"
                            />
                            <Input
                                type="email"
                                required
                                placeholder="E-mail"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="bg-background border-border/60 focus-visible:border-foreground focus-visible:ring-0 rounded-md text-[14px] h-11"
                            />
                        </div>
                        {/* Message */}
                        <Textarea
                            required
                            placeholder="Message..."
                            rows={5}
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            className="bg-background border-border/60 focus-visible:border-foreground focus-visible:ring-0 rounded-md text-[14px] min-h-[120px] resize-y"
                        />
                        {/* Submit */}
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full sm:w-fit mt-2 rounded-md font-medium px-8"
                        >
                            Send Message
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