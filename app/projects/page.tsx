import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { ALL_PROJECTS_QUERY } from "@/sanity/lib/queries";
import ScrambleText from "@/components/ScrambleText";

interface SanityProject {
    _id: string;
    title: string;
    slug: { current: string };
    date: string;
    description: string;
}

export const revalidate = 60;

export default async function ProjectsPage() {
    let projects: SanityProject[] = [];

    try {
        projects = await client.fetch<SanityProject[]>(ALL_PROJECTS_QUERY);
    } catch (error) {
        console.error("Failed to fetch projects from Sanity:", error);
    }

    return (
        <div className="min-h-screen px-6 pt-20 pb-32 flex flex-col items-center">
            <section className="w-full max-w-[760px] flex flex-col gap-8">
                <div
                    className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700"
                    style={{ animationFillMode: "both" }}
                >
                    <h3 className="mono-label font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                        Selected Work
                    </h3>
                    <h1 className="text-[clamp(1.6rem,4vw,2.4rem)] font-medium tracking-[-0.03em] leading-[1.1] text-foreground">
                        Case studies that show how I think under{" "}
                        <ScrambleText
                            text="real product pressure."
                            trigger="inView"
                            hold={450}
                            duration={1100}
                        />
                    </h1>
                    <p className="text-[14px] leading-[1.8] text-muted-foreground max-w-[65ch]">
                        Each project is written as a business story: what was broken, what I owned,
                        what shipped, and what changed. Less about pretty screens, more about
                        decision quality and outcomes.
                    </p>
                </div>

                <div
                    className="w-full h-px bg-border animate-in fade-in duration-700"
                    style={{ animationDelay: "200ms", animationFillMode: "both" }}
                />

                <div className="flex flex-col">
                    {projects.map((project, index) => (
                        <div
                            key={project._id}
                            className="animate-in fade-in slide-in-from-bottom-2 duration-700"
                            style={{ animationDelay: `${300 + index * 80}ms`, animationFillMode: "both" }}
                        >
                            <ProjectRow project={project} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

function ProjectRow({ project }: { project: SanityProject }) {
    const year = project.date ? new Date(project.date).getFullYear().toString() : "Undated";
    const label = inferProjectLabel(project);

    return (
        <Link
            href={`/projects/${project.slug.current}`}
            className="accent-left-hover group grid grid-cols-1 gap-2 border-b border-border/40 py-5 sm:grid-cols-[72px_1fr_auto] sm:items-start sm:gap-5 hover:border-foreground/20 hover:bg-muted/15 transition-all duration-300 rounded-sm px-2 -mx-2"
        >
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground/60 pt-0.5">
                {year}
            </span>

            <div className="min-w-0">
                <p className="text-[14.5px] font-medium text-foreground leading-snug">
                    {project.title}
                </p>
                <p className="mt-1 text-[13px] text-muted-foreground leading-[1.65] max-w-[62ch]">
                    {project.description}
                </p>
                <span className="inline-flex mt-2.5 text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/70 border border-border/40 rounded-sm px-2 py-0.5">
                    {label}
                </span>
            </div>

            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground/60 group-hover:text-foreground transition-colors pt-0.5">
                Read
                <ArrowUpRight size={12} strokeWidth={1.8} />
            </span>
        </Link>
    );
}

function inferProjectLabel(project: SanityProject) {
    const text = `${project.title} ${project.description}`.toLowerCase();

    if (/(workflow|portal|production|approval|order|cad|retailer)/.test(text)) {
        return "Workflow System";
    }

    if (/(saas|investor|deal|event|pitch|fundraise|valuation)/.test(text)) {
        return "Startup Platform";
    }

    return "Product Case Study";
}
