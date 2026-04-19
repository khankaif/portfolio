import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ALL_SLUGS_QUERY, PROJECT_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { ScrollReveal } from "@/components/ScrollReveal";
import ScrambleText from "@/components/ScrambleText";

interface StatItem {
    _key: string;
    value: string;
    label: string;
}

interface MediaItem {
    _key: string;
    image: { asset: { _ref: string } };
    caption?: string;
}

interface ContentBlock {
    _type: string;
    _key: string;
    challengeText?: string;
    designItems?: string[];
    engineeringItems?: string[];
    technologies?: string[];
    items?: MediaItem[];
    stats?: StatItem[];
    outcomeText?: string;
}

interface SanityProject {
    _id: string;
    title: string;
    slug: { current: string };
    date: string;
    description: string;
    projectUrl?: string;
    timeline?: string;
    role?: string[];
    heroImage?: { asset: { _ref: string } };
    content?: ContentBlock[];
}

interface ProjectNavItem {
    title: string;
    slug: string;
}

interface NarrativeLens {
    eyebrow: string;
    thesis: string;
    recruiterAngle: string;
    tags: string[];
}

interface StrategicMove {
    track: "Design" | "Engineering";
    text: string;
}

export const revalidate = 60;

export async function generateStaticParams() {
    const projects = await client.fetch<ProjectNavItem[]>(ALL_SLUGS_QUERY);
    return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    let project: SanityProject | null = null;
    let allProjects: ProjectNavItem[] = [];

    try {
        [project, allProjects] = await Promise.all([
            client.fetch<SanityProject | null>(PROJECT_BY_SLUG_QUERY, { slug }),
            client.fetch<ProjectNavItem[]>(ALL_SLUGS_QUERY),
        ]);
    } catch (error) {
        console.error("Failed to fetch project:", error);
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center px-6">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Project not found
                </p>
            </div>
        );
    }

    const blocks = project.content ?? [];
    const challengeText = blocks.find((block) => block._type === "challengeBlock")?.challengeText || "";
    const executionBlock = blocks.find((block) => block._type === "whatIDidBlock");
    const stats = blocks.find((block) => block._type === "statsBlock")?.stats ?? [];
    const outcomeText = blocks.find((block) => block._type === "outcomeBlock")?.outcomeText || "";
    const technologies = blocks.find((block) => block._type === "stackBlock")?.technologies ?? [];
    const mediaItems = blocks
        .filter((block) => block._type === "mediaBlock")
        .flatMap((block) => block.items ?? []);

    const designItems = executionBlock?.designItems ?? [];
    const engineeringItems = executionBlock?.engineeringItems ?? [];
    const strategicMoves = buildStrategicMoves(designItems, engineeringItems);
    const heroUrl = project.heroImage
        ? urlFor(project.heroImage).width(1600).height(900).fit("crop").url()
        : null;
    const year = project.date ? new Date(project.date).getFullYear().toString() : "Undisclosed";
    const lens = buildNarrativeLens(project, designItems.length, engineeringItems.length, stats);

    const currentIndex = allProjects.findIndex((item) => item.slug === slug);
    const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
    const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

    return (
        <div className="min-h-screen px-6 pt-20 pb-28 flex flex-col items-center">
            <article className="w-full max-w-[760px] flex flex-col gap-12">
                <ScrollReveal>
                <header className="flex flex-col gap-6">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground/60">
                            {lens.eyebrow}
                        </span>
                        {lens.tags.map((tag) => (
                            <span
                                key={tag}
                                className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground/60 border border-border/40 rounded-sm px-2 py-0.5"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-[clamp(1.8rem,4.5vw,2.8rem)] font-medium tracking-[-0.03em] leading-[1.05] text-foreground">
                        <ScrambleText text={project.title} trigger="mount" hold={400} duration={1000} delay={250} />
                    </h1>

                    <p className="text-[14.5px] leading-[1.85] text-muted-foreground max-w-[65ch]">
                        {project.description}
                    </p>

                    <p className="text-[13.5px] leading-[1.85] text-muted-foreground border-l-2 border-border/60 pl-4">
                        {lens.thesis}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-px border border-border/40 rounded-sm overflow-hidden bg-border/40">
                        <MetaItem label="Year" value={year} />
                        <MetaItem label="Timeline" value={project.timeline || "Long-form engagement"} />
                        <MetaItem label="Role" value={project.role?.join(" / ") || "Product ownership"} />
                        <MetaItem
                            label="Mode"
                            value={engineeringItems.length > 0 ? "Design + build" : "Product design"}
                        />
                    </div>

                </header>
                </ScrollReveal>

                {heroUrl && (
                    <ScrollReveal delay={0.05}>
                        <figure className="rounded-md overflow-hidden border border-border/40 bg-muted">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={heroUrl} alt={project.title} className="w-full h-auto block object-cover" />
                        </figure>
                    </ScrollReveal>
                )}

                <div className="w-full h-px bg-border" />

                <ScrollReveal>
                    <StorySection
                        label="Act I"
                        title="Business context"
                        intro="The value starts with understanding what was broken operationally, not just what looked outdated."
                    >
                        <p className="text-[14.5px] leading-[1.9] text-muted-foreground">
                            {challengeText || "Detailed business context coming soon."}
                        </p>
                    </StorySection>
                </ScrollReveal>

                <ScrollReveal>
                    <StorySection
                        label="Act II"
                        title="How I executed"
                        intro="Execution is split into strategic moves across design and engineering so ownership is clear."
                    >
                        {strategicMoves.length > 0 ? (
                            <ol className="flex flex-col">
                                {strategicMoves.map((move, index) => (
                                    <li
                                        key={`${move.track}-${index}`}
                                        className="py-4 border-b border-border/40 first:pt-0 last:pb-0 last:border-0 grid grid-cols-[44px_88px_1fr] gap-4"
                                    >
                                        <span className="font-mono text-[10px] text-muted-foreground/40 pt-1">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground/70 pt-1">
                                            {move.track}
                                        </span>
                                        <p className="text-[14px] leading-[1.8] text-muted-foreground">
                                            {move.text}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        ) : (
                            <p className="text-[14px] leading-[1.8] text-muted-foreground">
                                Execution details are being added.
                            </p>
                        )}
                    </StorySection>
                </ScrollReveal>

                {mediaItems.length > 0 && (
                    <ScrollReveal>
                        <StorySection
                            label="Selected screens"
                            title="Product snapshots"
                            intro="Screens are useful only after context. This keeps the narrative anchored in decisions and outcomes."
                        >
                            <div className="flex flex-col gap-5">
                                {mediaItems.map((item, index) => {
                                    const imageUrl = urlFor(item.image).width(1600).url();
                                    const caption = item.caption || `Screen ${index + 1}`;

                                    return (
                                        <figure
                                            key={item._key}
                                            className="rounded-md overflow-hidden border border-border/40 bg-card"
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={imageUrl} alt={caption} className="w-full h-auto block object-cover" />
                                            <figcaption className="px-4 py-3 text-[12.5px] text-muted-foreground border-t border-border/60">
                                                {caption}
                                            </figcaption>
                                        </figure>
                                    );
                                })}
                            </div>
                        </StorySection>
                    </ScrollReveal>
                )}

                <ScrollReveal>
                    <StorySection
                        label="Act III"
                        title="Impact and outcomes"
                        intro="Outcomes are what make a case study credible to startup teams and clients."
                    >
                        <div className="flex flex-col gap-5">
                            {stats.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-px border border-border/40 rounded-sm overflow-hidden bg-border/40">
                                    {stats.map((stat, index) => (
                                        <div
                                            key={stat._key}
                                            className="bg-background px-5 py-4 animate-in fade-in zoom-in-95 duration-500"
                                            style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
                                        >
                                            <p className="text-[22px] font-medium leading-none tracking-[-0.03em] text-foreground">
                                                {stat.value}
                                            </p>
                                            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground/60">
                                                {stat.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <p className="text-[14.5px] leading-[1.9] text-muted-foreground">
                                {outcomeText || "Outcome details are being added."}
                            </p>
                        </div>
                    </StorySection>
                </ScrollReveal>

                {technologies.length > 0 && (
                    <ScrollReveal>
                        <StorySection
                            label="System"
                            title="Technical stack"
                            intro="Tools are listed for context, but the case study focus stays on decisions and outcomes."
                        >
                            <div className="flex flex-wrap gap-2">
                                {technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2.5 py-1 rounded-sm font-mono text-[11px] tracking-wide border border-border/40 bg-muted/20 text-muted-foreground hover:bg-foreground hover:text-background transition-colors duration-200 cursor-default"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </StorySection>
                    </ScrollReveal>
                )}

                {project.projectUrl && (
                    <ScrollReveal>
                        <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground hover:text-muted-foreground transition-colors"
                        >
                            Visit live project
                            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </ScrollReveal>
                )}
            </article>

            <nav className="w-full max-w-[760px] border-t border-border/60 mt-14 pt-6 flex items-center justify-between gap-5">
                {prevProject ? (
                    <Link href={`/projects/${prevProject.slug}`} className="group flex flex-col gap-1 min-w-0 no-underline">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/70">
                            Previous
                        </span>
                        <span className="text-[13px] font-medium text-foreground truncate group-hover:text-muted-foreground transition-colors">
                            {prevProject.title}
                        </span>
                    </Link>
                ) : (
                    <div />
                )}

                <Link
                    href="/projects"
                    className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/70 hover:text-muted-foreground transition-colors"
                >
                    All Projects
                </Link>

                {nextProject ? (
                    <Link href={`/projects/${nextProject.slug}`} className="group flex flex-col gap-1 text-right min-w-0 no-underline">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/70">
                            Next
                        </span>
                        <span className="text-[13px] font-medium text-foreground truncate group-hover:text-muted-foreground transition-colors">
                            {nextProject.title}
                        </span>
                    </Link>
                ) : (
                    <div />
                )}
            </nav>
        </div>
    );
}

function StorySection({
    label,
    title,
    intro,
    children,
}: {
    label: string;
    title: string;
    intro: string;
    children: React.ReactNode;
}) {
    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <span className="mono-label font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground/60">
                    {label}
                </span>
                <h2 className="text-[1.1rem] font-medium tracking-[-0.02em] leading-snug text-foreground">
                    <ScrambleText text={title} trigger="inView" hold={380} duration={850} />
                </h2>
                <p className="text-[13px] text-muted-foreground leading-[1.8]">
                    {intro}
                </p>
            </div>
            <div className="w-full h-px bg-border/50" />
            <div>{children}</div>
        </section>
    );
}

function MetaItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-background px-4 py-3.5">
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground/60">
                {label}
            </p>
            <p className="mt-1.5 text-[13px] text-foreground leading-[1.5]">
                {value}
            </p>
        </div>
    );
}

function buildStrategicMoves(designItems: string[], engineeringItems: string[]) {
    const moves: StrategicMove[] = [];

    for (const item of designItems) {
        moves.push({ track: "Design", text: item });
    }

    for (const item of engineeringItems) {
        moves.push({ track: "Engineering", text: item });
    }

    return moves;
}

function buildNarrativeLens(
    project: SanityProject,
    designCount: number,
    engineeringCount: number,
    stats: StatItem[],
): NarrativeLens {
    const combinedText = `${project.title} ${project.description} ${(project.role || []).join(" ")}`.toLowerCase();
    const isWorkflowHeavy = /(workflow|approval|production|order|cad|retailer|portal|operations)/.test(combinedText);
    const isStartupPlatform = /(saas|investor|deal|pitch|event|fundraise|valuation|startup)/.test(combinedText);
    const hasOutcomeSignals = stats.length > 0;

    const tags = [
        engineeringCount > 0 ? "No-handoff delivery" : "Design leadership",
        isWorkflowHeavy ? "Complex workflow" : null,
        isStartupPlatform ? "Series A/B fit" : null,
        hasOutcomeSignals ? "Outcome evidence" : null,
    ].filter((tag): tag is string => Boolean(tag));

    if (designCount > 0 && engineeringCount > 0) {
        return {
            eyebrow: "Case study / design + engineering",
            thesis:
                "This project translates operational friction into shipped software. I owned the journey from workflow mapping and interface decisions to production implementation.",
            recruiterAngle:
                "For startup teams, this shows one operator who can move between product strategy, UX quality, and engineering execution without losing context.",
            tags,
        };
    }

    return {
        eyebrow: "Case study / product design",
        thesis:
            "This project focuses on strategic product design in a fast-moving environment where the product and company narrative had to mature together.",
        recruiterAngle:
            "For startups and clients, this demonstrates systems thinking, product coherence, and the ability to shape trust in early-stage products.",
        tags,
    };
}
