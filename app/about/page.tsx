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
        title: "UnivDiam Custom Portal",
        subtitle: "End-to-end React workflow platform — custom orders → CAD → approval → production",
        href: "https://www.skvinvest.de/portfolio",
    },
    {
        title: "Zefyron SaaS Platform",
        subtitle: "Enterprise deal flow, event & pitch platform — product design, €1M raised (NDA)",
        href: "https://zefyron.com/en",
    },
    {
        title: "Carpe Diam B2B Platform",
        subtitle: "React platform for jewelry retailers — asset management, CAD sharing, order tracking",
        href: "#",
    },
    {
        title: "Jewelry ERP & QC Tool",
        subtitle: "React + Supabase — production management & quality control system",
        href: "#",
        soon: true,
    },
];

const STACK: ProjectItem[] = [
    {
        title: "React & TypeScript",
        subtitle: "Core frontend — components, hooks, state, React Query",
        href: "https://react.dev",
    },
    {
        title: "Next.js",
        subtitle: "App Router, SSR, full-stack React applications",
        href: "https://nextjs.org",
    },
    {
        title: "Figma",
        subtitle: "Design systems, prototyping, developer handoff",
        href: "https://figma.com",
    },
    {
        title: "shadcn/ui & TailwindCSS",
        subtitle: "Component library, design system implementation",
        href: "https://ui.shadcn.com",
    },
    {
        title: "Supabase, PocketBase & Convex",
        subtitle: "BaaS — auth, real-time data, serverless backends",
        href: "https://supabase.com",
    },
    {
        title: "PostgreSQL & MongoDB",
        subtitle: "Relational and document databases",
        href: "https://postgresql.org",
    },
    {
        title: "GSAP & Framer Motion",
        subtitle: "Production animation — scroll, transitions, interactions",
        href: "https://gsap.com",
    },
    {
        title: "Webflow, Framer & Shopify",
        subtitle: "No-code — CMS sites, interactive builds, eCommerce",
        href: "https://webflow.com",
    },
    {
        title: "Vercel, Netlify & Railway",
        subtitle: "Deployment, CI/CD, environment management",
        href: "https://vercel.com",
    },
    {
        title: "n8n",
        subtitle: "Workflow automation, internal tool integrations",
        href: "https://n8n.io",
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
                        Computer Engineering graduate who chose interfaces over infrastructure.
                        Started designing in 2020, shipped my first professional product in 2021,
                        and never stopped doing both.
                    </p>
                    <p>
                        Spent 3 years as core product designer at Zefyron — an enterprise SaaS platform
                        that raised €1M — owning UX research, design systems, and product direction
                        across deal flow, event management, and investor tooling. Alongside that, built
                        and launched 5+ Webflow sites and multiple Shopify stores for real clients.
                    </p>
                    <p>
                        In 2025, crossed fully into engineering. Designed and built the UnivDiam
                        custom order portal end-to-end — React, TypeScript, Socket.IO, real-time
                        workflows. Currently building a B2B jewelry platform and ERP system at
                        Carpe Diam. I own the problem from research to deployed product.
                    </p>
                    <p>
                        No handoffs. No translation loss. One person who can take a business problem
                        and ship it.
                    </p>
                </div>
            </section>

            {/* ── Divider ──────────────────────────────────────────────────── */}
            <div className="w-full max-w-[500px] h-px bg-border" />

            {/* ── Projects Section ─────────────────────────────────────────── */}
            <section className="w-full max-w-[500px] flex flex-col gap-5">
                <SectionHeading
                    title="Selected Work"
                    subtitle="Real products, real clients — designed and built end-to-end."
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
                    subtitle="Design tools, frontend frameworks, backends, and no-code — the full picture."
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