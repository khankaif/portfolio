import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Hero from "@/components/Hero";
import Section from "@/components/layout/Section";
import { getProjects } from "@/lib/projects";

export default async function Home() {
    const projects = await getProjects();

    return (
        <main className="bg-background">
            <Hero />

            <div className="w-full max-w-content mx-auto px-6 pb-16">
                <Section label="Selected work" title="Problems I've shipped solutions to">
                    <div className="grid gap-4">
                        {projects.map(({ slug, meta }) => {
                            const stat = meta.stats?.[0];
                            return (
                                <Link
                                    key={slug}
                                    href={`/projects/${slug}`}
                                    className="group grid sm:grid-cols-[140px_1fr_auto] gap-3 sm:gap-6 items-start p-5 rounded-md border border-border/60 bg-card/40 hover:border-foreground/30 hover:bg-muted/30 transition-colors"
                                >
                                    {stat && (
                                        <div>
                                            <p className="text-stat font-medium text-foreground">{stat.value}</p>
                                            <p className="mt-1 font-mono text-micro uppercase text-muted-foreground">{stat.label}</p>
                                        </div>
                                    )}
                                    <div className="min-w-0">
                                        <p className="text-body font-medium text-foreground">{meta.title}</p>
                                        <p className="mt-1 text-small text-muted-foreground">{meta.description}</p>
                                        <p className="mt-3 font-mono text-micro uppercase text-muted-foreground">
                                            {meta.role} · {meta.date.slice(0, 4)}
                                        </p>
                                    </div>
                                    <ArrowUpRight
                                        size={16}
                                        className="hidden sm:block text-muted-foreground group-hover:text-foreground transition-colors"
                                    />
                                </Link>
                            );
                        })}
                    </div>
                </Section>
            </div>
        </main>
    );
}
