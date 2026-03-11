"use client";

import { ArrowUpRight, MapPin, Code, Palette } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ProjectItem {
    title: string;
    subtitle: string;
    href: string;
    soon?: boolean;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const PROJECTS: ProjectItem[] = [
    {
        title: "Enterprise Jewelry Platform",
        subtitle: "B2B made-to-order jewelry management",
        href: "#",
    },
    {
        title: "Zefyron SaaS Platform",
        subtitle: "Deal platforms, event management, pitch decks",
        href: "#",
    },
    {
        title: "Design System Library",
        subtitle: "React + TypeScript + Storybook",
        href: "#",
        soon: true,
    },
];

const STACK: ProjectItem[] = [
    {
        title: "React & TypeScript",
        subtitle: "Core frontend stack",
        href: "https://react.dev",
    },
    {
        title: "Figma",
        subtitle: "UI/UX design & prototyping",
        href: "https://figma.com",
    },
    {
        title: "shadcn/ui",
        subtitle: "Component library & design system",
        href: "https://ui.shadcn.com",
    },
    {
        title: "VS Code",
        subtitle: "Primary development environment",
        href: "https://code.visualstudio.com",
    },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function LinkRow({ title, subtitle, href, soon }: ProjectItem) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-3 py-3 border-b border-border/40 hover:border-foreground/40 transition-colors duration-300"
        >
            {/* Left */}
            <div className="flex flex-col gap-0.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[14px] font-medium text-foreground leading-snug truncate">
                        {title}
                    </span>
                    {soon && (
                        <Badge
                            variant="outline"
                            className="font-mono text-[10px] uppercase tracking-wider px-1.5 py-0 h-4 rounded-sm border-border text-muted-foreground"
                        >
                            Soon
                        </Badge>
                    )}
                </div>
                <span className="text-[13px] text-muted-foreground leading-snug truncate">
                    {subtitle}
                </span>
            </div>

            {/* Arrow icon */}
            <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="flex-shrink-0 text-muted-foreground group-hover:text-foreground transition-all duration-300 translate-x-0 sm:-translate-x-2 sm:group-hover:translate-x-0 group-hover:-translate-y-0.5 sm:translate-y-2 sm:group-hover:translate-y-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
            />
        </a>
    );
}

function SectionHeading({
    title,
    subtitle,
}: {
    title: string;
    subtitle: string;
}) {
    return (
        <div className="flex flex-col gap-2 mb-2">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                {title}
            </h3>
            <p className="text-[14px] text-foreground leading-relaxed">{subtitle}</p>
        </div>
    );
}

// ── Inline SVG stickers ───────────────────────────────────────────────────────

const CodeIcon = () => (
    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary shadow-sm align-middle mx-1 flex-shrink-0">
        <Code size={18} className="text-primary-foreground" />
    </span>
);

const DesignIcon = () => (
    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary shadow-sm align-middle mx-1 flex-shrink-0">
        <Palette size={18} className="text-primary-foreground" />
    </span>
);

const LocationIcon = () => (
    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary shadow-sm align-middle mx-1 flex-shrink-0">
        <MapPin size={18} className="text-primary-foreground" />
    </span>
);

// ── Main component ────────────────────────────────────────────────────────────

export default function About() {
    return (
        <div className="min-h-screen px-6 pt-8 pb-32 flex flex-col items-center gap-14">

            {/* ── About Section ───────────────────────────────────────────── */}
            <section className="w-full max-w-[500px] flex flex-col gap-6">
                {/* Sticker headline */}
                <div className="flex flex-wrap items-center gap-y-1.5 leading-snug">
                    <span className="text-[clamp(1.6rem,4.5vw,2rem)] font-medium tracking-tight">
                        Hey, I&apos;m&nbsp;a
                    </span>
                    <DesignIcon />
                    <span className="text-[clamp(1.6rem,4.5vw,2rem)] font-medium tracking-tight">
                        designer&nbsp;+
                    </span>
                    <CodeIcon />
                    <span className="text-[clamp(1.6rem,4.5vw,2rem)] font-medium tracking-tight">
                        engineer&nbsp;based&nbsp;in
                    </span>
                    <LocationIcon />
                    <span className="text-[clamp(1.6rem,4.5vw,2rem)] font-medium tracking-tight">
                        India
                    </span>
                </div>

                {/* Bio */}
                <div className="flex flex-col gap-4 text-[14.5px] text-muted-foreground leading-[1.7]">
                    <p>
                        Started as a Computer Engineering student in 2018. Got bored with backend
                        systems, fell in love with interfaces. By 2020, I was designing and building
                        web applications end-to-end.
                    </p>
                    <p>
                        In 2021, joined a startup as a UI/UX intern. By 2022, I was shipping Webflow
                        sites, design systems, and SaaS interfaces for enterprise clients. In 2023,
                        became core design team member at Zefyron, a funded SaaS platform (€1M raise),
                        owning product design for web and mobile applications.
                    </p>
                    <p>
                        In 2024-2025, transitioned to Product Engineering — designing and developing
                        enterprise B2B platforms in React, TypeScript, and modern frontend stacks.
                        I don&apos;t just design mockups. I don&apos;t just write code. I ship products that
                        solve real business problems.
                    </p>
                </div>
            </section>

            {/* ── Divider ──────────────────────────────────────────────────── */}
            <div className="w-full max-w-[500px] h-px bg-border" />

            {/* ── Projects Section ─────────────────────────────────────────── */}
            <section className="w-full max-w-[500px] flex flex-col gap-5">
                <SectionHeading
                    title="Recent Work"
                    subtitle="From enterprise B2B platforms to funded SaaS products — building end-to-end with design and code."
                />
                <div className="flex flex-col">
                    {PROJECTS.map((item) => (
                        <LinkRow key={item.title} {...item} />
                    ))}
                </div>
            </section>

            {/* ── Divider ──────────────────────────────────────────────────── */}
            <div className="w-full max-w-[500px] h-px bg-border" />

            {/* ── Stack Section ────────────────────────────────────────────── */}
            <section className="w-full max-w-[500px] flex flex-col gap-5">
                <SectionHeading
                    title="Stack"
                    subtitle="The tools and technologies I use daily to design, build, and ship products."
                />
                <div className="flex flex-col">
                    {STACK.map((item) => (
                        <LinkRow key={item.title} {...item} />
                    ))}
                </div>
            </section>

        </div>
    );
}