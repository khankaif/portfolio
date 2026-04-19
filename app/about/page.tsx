"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Code, Palette } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PhysicsSkills from "@/components/PhysicsSkills";
import ScrambleText from "@/components/ScrambleText";

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

interface StackLogoItem extends ProjectItem {
    logoSrcs: string[];
}

const STACK_LOGOS: StackLogoItem[] = [
    {
        title: "React",
        subtitle: "Core frontend — components, hooks, state, React Query",
        href: "https://react.dev",
        logoSrcs: ["/logos/react.svg"],
    },
    {
        title: "TypeScript",
        subtitle: "Core frontend — components, hooks, state, React Query",
        href: "https://react.dev",
        logoSrcs: ["/logos/ts.svg"],
    },
    {
        title: "Next.js",
        subtitle: "App Router, SSR, full-stack React applications",
        href: "https://nextjs.org",
        logoSrcs: ["/logos/Frame-1.svg"],
    },
    {
        title: "Figma",
        subtitle: "Design systems, prototyping, developer handoff",
        href: "https://figma.com",
        logoSrcs: ["/logos/Figma.svg"],
    },
    {
        title: "shadcn/ui",
        subtitle: "Component library, design system implementation",
        href: "https://ui.shadcn.com",
        logoSrcs: ["/logos/shadcn-ui.svg"],
    },
    {
        title: "TailwindCSS",
        subtitle: "Component library, design system implementation",
        href: "https://tailwindcss.com",
        logoSrcs: ["/logos/Tailwind CSS.svg"],
    },
    {
        title: "Supabase",
        subtitle: "BaaS — auth, real-time data, serverless backends",
        href: "https://supabase.com",
        logoSrcs: ["/logos/Supabase.svg"],
    },
    {
        title: "PocketBase",
        subtitle: "BaaS — auth, real-time data, serverless backends",
        href: "https://pocketbase.io",
        logoSrcs: ["/logos/Pocketbase.svg"],
    },
    {
        title: "Convex",
        subtitle: "BaaS — auth, real-time data, serverless backends",
        href: "https://convex.dev",
        logoSrcs: ["/logos/convex.svg"],
    },
    {
        title: "PostgreSQL",
        subtitle: "Relational and document databases",
        href: "https://postgresql.org",
        logoSrcs: ["/logos/postgreSQL.png"],
    },
    {
        title: "MongoDB",
        subtitle: "Relational and document databases",
        href: "https://mongodb.com",
        logoSrcs: ["/logos/MongoDB.svg"],
    },
    {
        title: "GSAP",
        subtitle: "Production animation — scroll, transitions, interactions",
        href: "https://gsap.com",
        logoSrcs: ["/logos/GSAP.svg"],
    },
    {
        title: "Framer Motion",
        subtitle: "Production animation — scroll, transitions, interactions",
        href: "https://www.framer.com/motion/",
        logoSrcs: ["/logos/motion.svg"],
    },
    {
        title: "Webflow",
        subtitle: "No-code — CMS sites, interactive builds, eCommerce",
        href: "https://webflow.com",
        logoSrcs: ["/logos/Webflow New.svg"],
    },
    {
        title: "Framer",
        subtitle: "No-code — CMS sites, interactive builds, eCommerce",
        href: "https://framer.com",
        logoSrcs: ["/logos/Framer.svg"],
    },
    {
        title: "Shopify",
        subtitle: "No-code — CMS sites, interactive builds, eCommerce",
        href: "https://shopify.com",
        logoSrcs: ["/logos/Shopify Black.svg"],
    },
    {
        title: "Vercel",
        subtitle: "Deployment, CI/CD, environment management",
        href: "https://vercel.com",
        logoSrcs: ["/logos/Vercel.svg"],
    },
    {
        title: "Netlify",
        subtitle: "Deployment, CI/CD, environment management",
        href: "https://netlify.com",
        logoSrcs: ["/logos/Netlify New 2023.svg"],
    },
    {
        title: "Railway",
        subtitle: "Deployment, CI/CD, environment management",
        href: "https://railway.app",
        logoSrcs: ["/logos/Railway App.svg"],
    },
    {
        title: "n8n",
        subtitle: "Workflow automation, internal tool integrations",
        href: "https://n8n.io",
        logoSrcs: ["/logos/Frame.svg"],
    },
];

// ── Animation variants ────────────────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const staggerList = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
};

const rowItem = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
};

// ── Sub-components ────────────────────────────────────────────────────────────

function LinkRow({ title, subtitle, href, soon, logoSrcs }: ProjectItem & { logoSrcs?: string[] }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="accent-left-hover group flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-3 py-3 border-b border-border/40 hover:border-foreground/30 hover:bg-muted/20 transition-all duration-300 rounded-sm px-1 -mx-1"
        >
            <div className="flex items-center gap-3 min-w-0">
                {logoSrcs && logoSrcs.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                        {logoSrcs.map((src) => (
                            <img key={src} src={src} alt="" className="h-5 w-auto object-contain" />
                        ))}
                    </div>
                )}
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
            </div>

            <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="flex-shrink-0 text-muted-foreground group-hover:text-foreground transition-all duration-300 translate-x-0 sm:-translate-x-2 sm:group-hover:translate-x-0 group-hover:-translate-y-0.5 sm:translate-y-2 sm:group-hover:translate-y-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
            />
        </a>
    );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
    return (
        <div className="flex flex-col gap-2 mb-2">
            <h3 className="mono-label font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                <ScrambleText text={title} trigger="inView" hold={380} duration={800} />
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
        <div className="min-h-screen px-6 pt-20 pb-32 flex flex-col items-center gap-14">

            {/* ── About Section ───────────────────────────────────────────── */}
            <section className="w-full max-w-[500px] flex flex-col gap-6">
                {/* Sticker headline */}
                <motion.div
                    className="flex flex-wrap items-center gap-y-1.5 leading-snug"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="text-[clamp(1.6rem,4.5vw,2rem)] font-medium tracking-tight">
                        Hey, I&apos;m&nbsp;a
                    </span>
                    <DesignIcon />
                    <span className="text-[clamp(1.6rem,4.5vw,2rem)] font-medium tracking-tight">
                        designer&nbsp;+
                    </span>
                    <CodeIcon />
                    <span className="text-[clamp(1.6rem,4.5vw,2rem)] font-medium tracking-tight">
                        <ScrambleText
                            text="engineer"
                            trigger="mount"
                            hold={480}
                            duration={1000}
                            delay={800}
                        />&nbsp;based&nbsp;in
                    </span>
                    <LocationIcon />
                    <span className="text-[clamp(1.6rem,4.5vw,2rem)] font-medium tracking-tight">
                        India
                    </span>
                </motion.div>

                {/* Bio — staggered paragraphs */}
                <motion.div
                    className="flex flex-col gap-4 text-[14.5px] text-muted-foreground leading-[1.7]"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.35 } },
                    }}
                >
                    {[
                        "Computer Engineering graduate who chose interfaces over infrastructure. Started designing in 2020, shipped my first professional product in 2021, and never stopped doing both.",
                        "Spent 3 years as core product designer at Zefyron — an enterprise SaaS platform that raised €1M — owning UX research, design systems, and product direction across deal flow, event management, and investor tooling. Alongside that, built and launched 5+ Webflow sites and multiple Shopify stores for real clients.",
                        "In 2025, crossed fully into engineering. Designed and built the UnivDiam custom order portal end-to-end — React, TypeScript, Socket.IO, real-time workflows. Currently building a B2B jewelry platform and ERP system at Carpe Diam. I own the problem from research to deployed product.",
                        "No handoffs. No translation loss. One person who can take a business problem and ship it.",
                    ].map((para, i) => (
                        <motion.p key={i} variants={fadeUp}>
                            {para}
                        </motion.p>
                    ))}
                </motion.div>
            </section>

            {/* ── Divider ──────────────────────────────────────────────────── */}
            <motion.div
                className="w-full max-w-[500px] h-px bg-border"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
                style={{ originX: 0 }}
            />

            {/* ── Projects Section ─────────────────────────────────────────── */}
            <section className="w-full max-w-[500px] flex flex-col gap-5">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <SectionHeading
                        title="Selected Work"
                        subtitle="Real products, real clients — designed and built end-to-end."
                    />
                </motion.div>

                <motion.div
                    className="flex flex-col"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    variants={staggerList}
                >
                    {PROJECTS.map((item) => (
                        <motion.div key={item.title} variants={rowItem}>
                            <LinkRow {...item} />
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* ── Divider ──────────────────────────────────────────────────── */}
            <motion.div
                className="w-full max-w-[500px] h-px bg-border"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ originX: 0 }}
            />

            {/* ── Stack Section ────────────────────────────────────────────── */}
            <section className="w-full max-w-[500px] flex flex-col gap-5">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <SectionHeading
                        title="Stack"
                        subtitle="Design tools, frontend frameworks, backends, and no-code — the full picture."
                    />
                </motion.div>

                <motion.div
                    className="flex flex-col"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    variants={staggerList}
                >
                    {STACK.map((item) => (
                        <motion.div key={item.title} variants={rowItem}>
                            <LinkRow {...item} />
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* ── Physics Playground ───────────────────────────────────────── */}
            <motion.section
                className="w-screen -mx-6 flex flex-col gap-5 border-t border-border pt-10 px-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="w-full max-w-[500px] mx-auto">
                    <SectionHeading
                        title="Interactive Stack"
                        subtitle="Physics-driven playground. Grab, toss, and drop the tools I use."
                    />
                </div>
                <PhysicsSkills items={STACK_LOGOS} />
            </motion.section>

        </div>
    );
}
