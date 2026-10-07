import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getProjects } from "@/lib/projects";
import PageShell from "@/components/layout/PageShell";
import PageHeader from "@/components/layout/PageHeader";

type Project = Awaited<ReturnType<typeof getProjects>>[number];

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <PageShell width="content" className="gap-8">
            <section className="w-full flex flex-col gap-8">
                <PageHeader
                    index="02"
                    label="Work"
                    title="From operational friction to shipped software."
                    lede="Each one is written as a business story: what was broken, what I owned, what shipped, and what changed."
                />

                <div className="flex flex-col pt-2">
                    {projects.map((project, index) => (
                        <div
                            key={project.slug}
                            className="animate-in fade-in slide-in-from-bottom-2 duration-700"
                            style={{ animationDelay: `${300 + index * 80}ms`, animationFillMode: "both" }}
                        >
                            <ProjectRow project={project} />
                        </div>
                    ))}
                </div>
            </section>
        </PageShell>
    );
}

function ProjectRow({ project: { slug, meta } }: { project: Project }) {
    const year = meta.date.slice(0, 4);

    return (
        <Link
            href={`/projects/${slug}`}
            className="accent-left-hover group grid grid-cols-1 gap-2 border-b border-border/40 py-5 sm:grid-cols-[72px_1fr_auto] sm:items-start sm:gap-5 hover:border-foreground/20 hover:bg-muted/15 transition-all duration-300 rounded-sm px-2 -mx-2"
        >
            <span className="font-mono text-micro uppercase text-muted-foreground pt-0.5">
                {year}
            </span>

            <div className="min-w-0">
                <p className="text-body font-medium text-foreground leading-snug">
                    {meta.title}
                </p>
                <p className="mt-1 text-small text-muted-foreground max-w-prose">
                    {meta.description}
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="inline-flex text-micro font-mono uppercase text-muted-foreground border border-border/40 rounded-sm px-2 py-0.5">
                        {meta.role}
                    </span>
                    {meta.stack && (
                        <span className="text-micro font-mono text-muted-foreground">
                            {meta.stack.slice(0, 4).join(" · ")}
                        </span>
                    )}
                </div>
            </div>

            <span className="inline-flex items-center gap-1 text-micro font-mono text-muted-foreground group-hover:text-foreground transition-colors pt-0.5">
                Read
                <ArrowUpRight size={12} strokeWidth={1.8} />
            </span>
        </Link>
    );
}
