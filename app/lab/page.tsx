"use client";

import { motion } from "framer-motion";
import PhysicsSkills from "@/components/PhysicsSkills";
import PageHeader from "@/components/layout/PageHeader";

const STACK_LOGOS = [
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

export default function LabPage() {
    return (
        <div className="min-h-screen pt-page-top pb-32 flex flex-col gap-section overflow-hidden">
            <section className="w-full max-w-content px-6 mx-auto">
                <PageHeader
                    index="05"
                    label="Lab"
                    title="Interactive sandbox"
                    lede="A physics playground of my toolkit. Grab, toss and drop the pieces."
                />
            </section>

            <motion.section
                className="w-full flex-grow flex flex-col px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
                <div className="w-full h-px bg-border max-w-content mx-auto mb-10" />
                {/* Physics needs room and a mouse; phones get a static grid. */}
                <div className="hidden md:block">
                    <PhysicsSkills items={STACK_LOGOS} />
                </div>
                <div className="md:hidden grid grid-cols-4 gap-2 px-6">
                    {STACK_LOGOS.map((s) => (
                        <div key={s.title} className="aspect-square flex items-center justify-center rounded-2xl bg-card border border-border/60">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={s.logoSrcs[0]} alt={s.title} className="max-h-7 w-auto object-contain" />
                        </div>
                    ))}
                </div>
            </motion.section>
        </div>
    );
}
