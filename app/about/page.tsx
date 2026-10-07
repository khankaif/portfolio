import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/layout/Section";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getProjects } from "@/lib/projects";

export const metadata = { title: "About" };

// ── Data ──────────────────────────────────────────────────────────────────────

const EXPERIENCE = [
    {
        when: "2025 — now",
        role: "Product Engineer",
        org: "Carpe Diam · Mumbai",
        text: "Full-stack across a jewelry manufacturer's platforms: the UnivDiam order and CAD-approval system for B2B retailers, an offline-first QC inspection app, and the Shopify storefront.",
    },
    {
        when: "2021 — 2025",
        role: "UX/UI Designer, intern → full-time",
        org: "VCBay · Remote",
        text: "Led product design for Zefyron, a SaaS suite for startups, investors and corporates. Built its design system, plus Webflow sites for 5+ brands and investor decks.",
    },
    {
        when: "2024 — now",
        role: "Freelance",
        org: "Design & Shopify",
        text: "Brand identities, UI and complete Shopify stores for small businesses.",
    },
    {
        when: "2021",
        role: "React Developer, intern",
        org: "SAMISON Corporate · Remote",
        text: "First production React work — a large static site, responsive and cross-browser.",
    },
    {
        when: "2018 — 2022",
        role: "B.E. Computer Engineering",
        org: "Rizvi College of Engineering · Mumbai",
        text: "",
    },
];

const ALSO_SHIPPED = [
    { title: "Affy Jewelry", subtitle: "Shopify store", href: "https://www.affyjewelry.com/" },
    { title: "Carpe Diam", subtitle: "Shopify store", href: "https://www.carpediam.in/" },
    { title: "Ace Catering Equipment", subtitle: "Shopify store, UK", href: "https://acecaterequip.co.uk/" },
    { title: "SKV Invest", subtitle: "Webflow site and portfolio CMS", href: "https://www.skvinvest.de/portfolio" },
];

const STACK = [
    { group: "Frontend", items: "React, Next.js, TypeScript, TailwindCSS, shadcn/ui, React Query, Framer Motion" },
    { group: "Backend", items: "Node.js, Express, PostgreSQL, MySQL, Redis, BullMQ, Socket.IO" },
    { group: "Infra", items: "Docker, nginx, pm2, Linux VPS, S3, Sentry" },
    { group: "Design", items: "Figma, design systems, prototyping, Webflow, Shopify" },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function About() {
    const projects = await getProjects();

    return (
        <PageShell width="content">
            <section className="w-full flex flex-col gap-6">
                <PageHeader index="03" label="About" title="Designer by training. Engineer by choice." />

                <div className="flex flex-col gap-4 text-body text-muted-foreground max-w-prose">
                    <p>
                        I studied Computer Engineering, then spent four years designing products — starting as an
                        intern and ending up leading design for Zefyron, a SaaS platform for startups and investors.
                        Design systems, enterprise dashboards, the website, the pitch deck.
                    </p>
                    <p>
                        Designing was never the end of it for me. I kept wanting to own what happened after the
                        handoff, so in 2025 I moved into engineering full-time as a Product Engineer at Carpe Diam.
                    </p>
                    <p>
                        Now I work across the whole stack: React and Next.js on the front; Node, Postgres, MySQL and
                        Redis behind it; deployed on servers I set up myself with Docker, nginx and pm2. The
                        work is the unglamorous kind that matters — order pipelines, CAD approvals, factory
                        inspections that have to work without signal.
                    </p>
                    <p className="text-foreground">
                        What I&apos;m good at: turning messy, real-world operations into software people use every
                        day, and making it feel simple to them.
                    </p>
                </div>
            </section>

            <ScrollReveal>
                <Section label="Experience">
                    <ol className="flex flex-col">
                        {EXPERIENCE.map((e) => (
                            <li
                                key={e.role + e.when}
                                className="grid sm:grid-cols-[120px_1fr] gap-1 sm:gap-6 py-4 border-b border-border/40 last:border-0"
                            >
                                <span className="font-mono text-micro uppercase text-muted-foreground pt-1">{e.when}</span>
                                <div>
                                    <p className="text-body font-medium text-foreground">{e.role}</p>
                                    <p className="text-small text-muted-foreground">{e.org}</p>
                                    {e.text && <p className="mt-2 text-small text-muted-foreground max-w-prose">{e.text}</p>}
                                </div>
                            </li>
                        ))}
                    </ol>
                </Section>
            </ScrollReveal>

            <ScrollReveal>
                <Section label="Case studies">
                    <div className="flex flex-col">
                        {projects.map(({ slug, meta }) => (
                            <Row key={slug} title={meta.title} subtitle={meta.role} href={`/projects/${slug}`} />
                        ))}
                    </div>
                </Section>
            </ScrollReveal>

            <ScrollReveal>
                <Section label="Also shipped" intro="Storefronts and marketing sites, designed and built end to end.">
                    <div className="flex flex-col">
                        {ALSO_SHIPPED.map((s) => (
                            <Row key={s.title} {...s} external />
                        ))}
                    </div>
                </Section>
            </ScrollReveal>

            <ScrollReveal>
                <Section label="Stack" intro="What I reach for in production.">
                    <dl className="flex flex-col">
                        {STACK.map((s) => (
                            <div
                                key={s.group}
                                className="grid sm:grid-cols-[120px_1fr] gap-1 sm:gap-6 py-3 border-b border-border/40 last:border-0"
                            >
                                <dt className="font-mono text-micro uppercase text-muted-foreground pt-1">{s.group}</dt>
                                <dd className="text-body text-foreground">{s.items}</dd>
                            </div>
                        ))}
                    </dl>
                </Section>
            </ScrollReveal>
        </PageShell>
    );
}

function Row({ title, subtitle, href, external }: { title: string; subtitle: string; href: string; external?: boolean }) {
    const className =
        "accent-left-hover group flex items-center justify-between gap-3 py-3 border-b border-border/40 hover:bg-muted/20 transition-all duration-300 rounded-sm px-1 -mx-1";
    const body = (
        <>
            <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-body font-medium text-foreground leading-snug">{title}</span>
                <span className="text-small text-muted-foreground leading-snug">{subtitle}</span>
            </div>
            <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="shrink-0 text-muted-foreground group-hover:text-foreground transition-colors"
            />
        </>
    );

    return external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{body}</a>
    ) : (
        <Link href={href} className={className}>{body}</Link>
    );
}
