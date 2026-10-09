"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { ProjectMeta } from "@/lib/projects";

interface ProjectItem {
    slug: string;
    meta: ProjectMeta;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
};

export default function ProjectList({ projects }: { projects: ProjectItem[] }) {
    return (
        <motion.div
            className="flex flex-col gap-8 sm:gap-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {projects.map(({ slug, meta }, idx) => {
                const stats = meta.stats?.slice(0, 2) ?? [];
                const indexStr = String(idx + 1).padStart(2, "0");

                return (
                    <motion.div key={slug} variants={cardVariants}>
                        <Link
                            href={`/projects/${slug}`}
                            className="group block relative rounded-xl border border-border/70 bg-card/50 p-6 sm:p-8 md:p-9 hover:border-foreground/30 hover:bg-muted/30 transition-all duration-300"
                        >
                            <div className="flex flex-col gap-6">
                                {/* Top Bar: Index + Role + Date + Arrow */}
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-2 font-mono text-micro uppercase text-muted-foreground tracking-wider">
                                        <span className="text-foreground font-semibold">{indexStr}</span>
                                        <span>/</span>
                                        <span>{meta.role}</span>
                                        <span>·</span>
                                        <span>{meta.timeline || meta.date.slice(0, 4)}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-small text-muted-foreground group-hover:text-foreground transition-colors">
                                        <span className="hidden sm:inline text-micro font-mono uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                                            Read case study
                                        </span>
                                        <ArrowUpRight
                                            size={17}
                                            className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                        />
                                    </div>
                                </div>

                                {/* Main Content: Title + Description */}
                                <div className="flex flex-col gap-2 max-w-prose">
                                    <h2 className="text-title font-medium text-foreground tracking-tight group-hover:text-foreground transition-colors">
                                        {meta.title}
                                    </h2>
                                    <p className="text-body text-muted-foreground leading-relaxed">
                                        {meta.description}
                                    </p>
                                </div>

                                {/* Hero preview for projects with visuals (e.g. UnivDiam) */}
                                {meta.hero && (
                                    <div className="relative rounded-lg overflow-hidden border border-border/50 bg-muted/40 aspect-[16/9] max-h-72 w-full mt-1">
                                        <Image
                                            src={meta.hero}
                                            alt={meta.title}
                                            fill
                                            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                                            sizes="(max-width: 768px) 100vw, 760px"
                                        />
                                    </div>
                                )}

                                {/* Impact Stats Strip */}
                                {stats.length > 0 && (
                                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
                                        {stats.map((stat) => (
                                            <div key={stat.label} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted/40 border border-border/50 text-small">
                                                <span className="font-semibold text-foreground">{stat.value}</span>
                                                <span className="text-muted-foreground text-micro font-mono uppercase">{stat.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Stack Tags */}
                                {meta.stack && meta.stack.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                        {meta.stack.slice(0, 6).map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-0.5 rounded text-micro font-mono border border-border/40 bg-muted/20 text-muted-foreground"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {meta.stack.length > 6 && (
                                            <span className="px-1.5 py-0.5 text-micro font-mono text-muted-foreground">
                                                +{meta.stack.length - 6}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </Link>
                    </motion.div>
                );
            })}
        </motion.div>
    );
}
