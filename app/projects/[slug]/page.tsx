import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getProject, getProjects, getSlugs } from "@/lib/projects";
import { ScrollReveal } from "@/components/ScrollReveal";
import PageShell from "@/components/layout/PageShell";
import Section from "@/components/layout/Section";
import CountUp from "@/components/motion/CountUp";
import Toc from "@/components/motion/Toc";
import BrowserFrame from "@/components/mdx/BrowserFrame";

export const dynamicParams = false;

export function generateStaticParams() {
    return getSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const project = await getProject((await params).slug);
    return project ? { title: project.meta.title, description: project.meta.description } : {};
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = await getProject(slug);
    if (!project) notFound();

    const { meta: m, Content } = project;
    const stats = m.stats ?? [];
    const technologies = m.stack ?? [];
    const allProjects = (await getProjects()).map((p) => ({ slug: p.slug, title: p.meta.title }));
    const currentIndex = allProjects.findIndex((item) => item.slug === slug);
    const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
    const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

    return (
        <PageShell width="content">
            <Toc />
            <article className="w-full flex flex-col gap-12 sm:gap-16">
                <ScrollReveal>
                <header className="flex flex-col gap-6 max-w-prose">
                    <span className="font-mono text-micro uppercase text-muted-foreground">
                        Case study / {m.role}
                    </span>

                    <h1 className="text-display font-medium text-foreground">
                        {m.title}
                    </h1>
                </header>
                </ScrollReveal>

                {m.hero && (
                    <ScrollReveal delay={0.05}>
                        <BrowserFrame url={m.url}>
                            <Image src={m.hero} alt={m.title} width={1600} height={900} priority className="w-full h-auto block object-cover" />
                        </BrowserFrame>
                    </ScrollReveal>
                )}

                <ScrollReveal>
                <div className="flex flex-col gap-6 max-w-prose">
                    <p className="text-body text-muted-foreground">
                        {m.description}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-px border border-border/40 rounded-sm overflow-hidden bg-border/40 w-full">
                        <MetaItem label="Year" value={m.date.slice(0, 4)} />
                        <MetaItem label="Timeline" value={m.timeline} />
                        <MetaItem label="Role" value={m.role} />
                        <MetaItem label="Team" value={m.team} />
                    </div>
                </div>
                </ScrollReveal>

                <div className="w-full h-px bg-border my-2" />

                {stats.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-px border border-border/40 rounded-sm overflow-hidden bg-border/40">
                        {stats.map((stat) => (
                            <div key={stat.label} className="bg-background px-6 py-6 sm:py-7">
                                <p className="text-stat font-medium text-foreground"><CountUp value={stat.value} /></p>
                                <p className="mt-2 font-mono text-micro uppercase text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                )}

                <div>
                    <Content />
                </div>

                {technologies.length > 0 && (
                    <ScrollReveal>
                        <Section
                            label="System"
                            title="Technical stack"
                            intro="Tools are listed for context, but the case study focus stays on decisions and outcomes."
                        >
                            <div className="flex flex-wrap gap-2">
                                {technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2.5 py-1 rounded-sm font-mono text-micro border border-border/40 bg-muted/20 text-muted-foreground hover:bg-foreground hover:text-background transition-colors duration-200 cursor-default"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </Section>
                    </ScrollReveal>
                )}

                {m.url && (
                    <ScrollReveal>
                        <a
                            href={m.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1.5 text-small font-medium text-foreground hover:text-muted-foreground transition-colors"
                        >
                            Visit live project
                            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </ScrollReveal>
                )}
            </article>

            <nav className="w-full border-t border-border/60 pt-6 flex items-center justify-between gap-5">
                {prevProject ? (
                    <Link href={`/projects/${prevProject.slug}`} className="group flex flex-col gap-1 min-w-0 no-underline">
                        <span className="font-mono text-micro font-medium uppercase text-muted-foreground">
                            Previous
                        </span>
                        <span className="text-small font-medium text-foreground truncate group-hover:text-muted-foreground transition-colors">
                            {prevProject.title}
                        </span>
                    </Link>
                ) : (
                    <div />
                )}

                <Link
                    href="/projects"
                    className="font-mono text-micro font-medium uppercase text-muted-foreground hover:text-muted-foreground transition-colors"
                >
                    All Projects
                </Link>

                {nextProject ? (
                    <Link href={`/projects/${nextProject.slug}`} className="group flex flex-col gap-1 text-right min-w-0 no-underline">
                        <span className="font-mono text-micro font-medium uppercase text-muted-foreground">
                            Next
                        </span>
                        <span className="text-small font-medium text-foreground truncate group-hover:text-muted-foreground transition-colors">
                            {nextProject.title}
                        </span>
                    </Link>
                ) : (
                    <div />
                )}
            </nav>
        </PageShell>
    );
}

function MetaItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-background px-4 py-3.5">
            <p className="font-mono text-micro uppercase text-muted-foreground">
                {label}
            </p>
            <p className="mt-1.5 text-small text-foreground">
                {value}
            </p>
        </div>
    );
}
