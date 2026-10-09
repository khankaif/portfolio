"use client";

import Link from "next/link";
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

const rowVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
};

// Same divider-row language as the About page lists: no cards, accent rule on hover.
export default function ProjectList({ projects }: { projects: ProjectItem[] }) {
    return (
        <motion.div className="flex flex-col border-t border-border/40" variants={containerVariants} initial="hidden" animate="visible">
            {projects.map(({ slug, meta }) => (
                <motion.div key={slug} variants={rowVariants}>
                    <Link
                        href={`/projects/${slug}`}
                        className="accent-left-hover group flex items-start justify-between gap-4 py-6 sm:py-7 border-b border-border/40 hover:bg-muted/20 transition-all duration-300 rounded-sm px-3 -mx-3"
                    >
                        <div className="flex flex-col gap-1.5 min-w-0 max-w-prose">
                            <h2 className="text-heading font-medium text-foreground">{meta.title}</h2>
                            <p className="text-body text-muted-foreground leading-relaxed">{meta.description}</p>
                            <p className="mt-1.5 font-mono text-micro uppercase text-muted-foreground">
                                {meta.role} · {meta.timeline}
                            </p>
                        </div>

                        <ArrowUpRight
                            size={16}
                            strokeWidth={1.5}
                            className="shrink-0 mt-1.5 text-muted-foreground group-hover:text-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </Link>
                </motion.div>
            ))}
        </motion.div>
    );
}
