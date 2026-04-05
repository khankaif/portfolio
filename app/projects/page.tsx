import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { ALL_PROJECTS_QUERY } from "@/sanity/lib/queries";

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
                <div className="flex flex-col gap-3">
                    <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-semibold tracking-[-0.04em] leading-[1.02] text-foreground">
                        Case studies that show how I think under real product pressure.
                    </h1>
                    <p className="text-[14.5px] leading-[1.8] text-muted-foreground max-w-[65ch]">
                        Each project is written as a business story: what was broken, what I owned,
                        what shipped, and what changed. This is less about pretty screens and more
                        about decision quality, execution range, and outcomes.
                    </p>
                </div>

                <div className="w-full h-px bg-border" />

                <div className="flex flex-col">
                    {projects.map((project) => (
                        <ProjectRow key={project._id} project={project} />
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
            className="group grid grid-cols-1 gap-2 border-b border-border/40 py-5 sm:grid-cols-[80px_1fr_auto] sm:items-start sm:gap-5 hover:border-foreground/40 transition-colors duration-300"
        >
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/70">
                {year}
            </span>

            <div className="min-w-0">
                <p className="text-[15px] font-medium text-foreground leading-snug">
                    {project.title}
                </p>
                <p className="mt-1 text-[13.5px] text-muted-foreground leading-[1.6] max-w-[62ch]">
                    {project.description}
                </p>
                <span className="inline-flex mt-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/80 border border-border/50 rounded-full px-2 py-1">
                    {label}
                </span>
            </div>

            <span className="inline-flex items-center gap-1 text-[12px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Read case study
                <ArrowUpRight size={14} strokeWidth={1.8} />
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
