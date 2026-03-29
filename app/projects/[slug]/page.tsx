import Link from "next/link";
import { hygraphClient } from "@/lib/hygraph";
import { HygraphProject, HygraphAsset } from "@/types/hygraph";
import { gql } from "graphql-request";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

// ── GraphQL Queries ──────────────────────────────────────────────────────────

export const revalidate = 60;

const GET_PROJECT_BY_SLUG = gql`
  query GetProjectBySlug($slug: String!) {
    project(where: { slug: $slug }) {
      id
      title
      slug
      date
      description
      longDescription
      projectUrl
      role
      podTeam
      solutions
      results
      media {
        url
        mimeType
      }
    }
  }
`;

const GET_ALL_PROJECTS = gql`
  query GetAllProjects {
    projects(orderBy: date_DESC) {
      id
      title
      slug
    }
  }
`;



function MediaItem({ item, alt }: { item: HygraphAsset; alt: string }) {
    const mime = item.mimeType || "";
    const url = item.url || "";

    // Video
    if (mime.startsWith("video/")) {
        return (
            <div className="w-full rounded-2xl overflow-hidden bg-muted">
                <video
                    src={url}
                    controls
                    playsInline
                    muted
                    className="w-full h-auto block"
                />
            </div>
        );
    }

    // PDF
    if (mime === "application/pdf") {
        return (
            <div className="w-full rounded-2xl overflow-hidden bg-muted aspect-[4/3]">
                <iframe
                    src={url}
                    title={alt}
                    className="w-full h-full border-0"
                />
            </div>
        );
    }

    // Image (default)
    return (
        <div className="w-full rounded-2xl overflow-hidden bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={url}
                alt={alt}
                className="w-full h-auto block"
                style={{
                    aspectRatio:
                        item.width && item.height
                            ? `${item.width}/${item.height}`
                            : undefined,
                    objectFit: "cover",
                }}
            />
        </div>
    );
}


// ── Page ─────────────────────────────────────────────────────────────────────

export default async function ProjectPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;

    let project: HygraphProject | null = null;
    let allProjects: { id: string; title: string; slug: string }[] = [];

    try {
        const [projectData, allData] = await Promise.all([
            hygraphClient.request<{ project: HygraphProject | null }>(GET_PROJECT_BY_SLUG, { slug }),
            hygraphClient.request<{ projects: { id: string; title: string; slug: string }[] }>(GET_ALL_PROJECTS),
        ]);
        project = projectData.project;
        allProjects = allData.projects;
    } catch (e) {
        console.error("Failed to fetch project from Hygraph:", e);
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-muted-foreground font-sans text-sm tracking-widest uppercase">Project not found</p>
            </div>
        );
    }

    // ── Adjacent project navigation ──
    const currentIndex = allProjects.findIndex((p) => p.slug === slug);
    const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
    const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

    // ── Media items ──
    const mediaItems: HygraphAsset[] = project.media || [];
    const heroImage = mediaItems.find((m) => m.mimeType?.startsWith("image/"));
    const secondaryImages = mediaItems.filter((m) => m.mimeType?.startsWith("image/")).slice(1);

    // ── Date display ──
    const dateDisplay = project.date
        ? new Date(project.date).getFullYear().toString()
        : "";

    // ── Build metadata rows (only populated fields) ──
    const metaRows: { label: string; values: { text: string; href?: string }[] }[] = [];

    if (dateDisplay) {
        metaRows.push({ label: "Year", values: [{ text: dateDisplay }] });
    }
    if (project.projectUrl) {
        const display = project.projectUrl
            .replace("https://", "")
            .replace("http://", "")
            .replace(/\/$/, "");
        metaRows.push({ label: "Website", values: [{ text: display, href: project.projectUrl }] });
    }
    if (project.role && project.role.length > 0) {
        metaRows.push({ label: "Role", values: project.role.map((r) => ({ text: r })) });
    }
    if (project.podTeam && project.podTeam.length > 0) {
        metaRows.push({ label: "Team", values: project.podTeam.map((m) => ({ text: m })) });
    }

    return (
        <div className="min-h-screen font-sans">

            {/* ── Main Split ── */}
            <div className="flex flex-col lg:flex-row min-h-screen pt-[60px] mx-auto max-w-[1440px]">

                {/* ── Left Panel ── */}
                <aside className="
                    w-full lg:w-[480px] xl:w-[520px]
                    flex-shrink-0
                    px-6 lg:px-10 xl:px-12
                    py-10 lg:py-16
                    flex flex-col
                    lg:sticky lg:top-[60px] lg:self-start
                ">

                    {/* Eyebrow label */}
                    <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-muted-foreground/50 mb-8 select-none">
                        Case Study
                    </p>

                    {/* Title */}
                    <h1 className="text-[40px] xl:text-[54px] font-bold tracking-[-0.035em] leading-[1.05] text-foreground mb-6">
                        {project.title}
                    </h1>

                    {/* Short rule */}
                    <div className="w-8 h-px bg-foreground/20 mb-6" />

                    {/* Description */}
                    <p className="text-[14px] font-normal leading-[1.75] tracking-[-0.01em] text-muted-foreground mb-4">
                        {project.description}
                    </p>

                    {project.longDescription && (
                        <p className="text-[14px] font-normal leading-[1.75] tracking-[-0.01em] text-muted-foreground">
                            {project.longDescription}
                        </p>
                    )}

                    {/* ── Metadata table ── */}
                    {metaRows.length > 0 && (
                        <div className="mt-10 border-t border-border/60">
                            {metaRows.map(({ label, values }) => (
                                <div
                                    key={label}
                                    className="flex items-baseline gap-6 py-3.5 border-b border-border/60"
                                >
                                    <span className="w-14 flex-shrink-0 text-[11px] font-semibold tracking-[0.08em] uppercase text-muted-foreground/40 select-none">
                                        {label}
                                    </span>
                                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                                        {values.map(({ text, href }) =>
                                            href ? (
                                                <a
                                                    key={text}
                                                    href={href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[13px] font-medium text-foreground hover:text-muted-foreground underline underline-offset-2 decoration-foreground/20 transition-colors"
                                                >
                                                    {text}
                                                </a>
                                            ) : (
                                                <span key={text} className="text-[13px] font-medium text-foreground">
                                                    {text}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ── Accordions ── */}
                    <div className="mt-8">
                        <Accordion type="multiple" className="w-full">
                            {(project.solutions || project.description) && (
                                <AccordionItem value="solutions" className="border-b border-border/60">
                                    <AccordionTrigger className="py-4 hover:no-underline w-full font-sans text-[11px] font-semibold tracking-[0.08em] uppercase text-muted-foreground/50 hover:text-foreground transition-colors data-[state=open]:text-foreground">
                                        Solutions
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-5 font-sans text-[13px] font-normal leading-[1.8] tracking-[-0.01em] text-muted-foreground whitespace-pre-wrap">
                                        {project.solutions || project.description}
                                    </AccordionContent>
                                </AccordionItem>
                            )}

                            <AccordionItem value="results" className="border-b border-border/60">
                                <AccordionTrigger className="py-4 hover:no-underline w-full font-sans text-[11px] font-semibold tracking-[0.08em] uppercase text-muted-foreground/50 hover:text-foreground transition-colors data-[state=open]:text-foreground">
                                    Results
                                </AccordionTrigger>
                                <AccordionContent className="pb-5 font-sans text-[13px] font-normal leading-[1.8] tracking-[-0.01em] text-muted-foreground whitespace-pre-wrap">
                                    {project.results || "Results pending case study completion."}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </aside>

                {/* ── Right Panel: Media ── */}

                <main className="flex-1 min-w-0 px-6 lg:px-10 xl:px-12 py-10 lg:py-16 flex flex-col gap-4">
                    {mediaItems.map((item, i) => (
                        <MediaItem key={i} item={item} alt={`${project.title} ${i + 1}`} />
                    ))}
                </main>
            </div>

            {/* ── Bottom Navigation ── */}
            <nav className="border-t border-border/60 bg-background">
                <div className="max-w-[1440px] mx-auto px-6 lg:px-10 xl:px-12 py-6 flex items-center justify-between gap-8">

                    {prevProject ? (
                        <Link href={`/projects/${prevProject.slug}`} className="group flex flex-col gap-1 no-underline min-w-0">
                            <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-muted-foreground/40 group-hover:text-muted-foreground transition-colors">
                                ← Previous
                            </span>
                            <span className="text-[13px] font-semibold text-foreground tracking-[-0.02em] truncate group-hover:text-muted-foreground transition-colors">
                                {prevProject.title}
                            </span>
                        </Link>
                    ) : <div />}

                    <Link
                        href="/projects"
                        className="flex-shrink-0 text-[10px] font-semibold tracking-[0.1em] uppercase text-muted-foreground/40 hover:text-muted-foreground transition-colors no-underline"
                    >
                        All Projects
                    </Link>

                    {nextProject ? (
                        <Link href={`/projects/${nextProject.slug}`} className="group flex flex-col gap-1 no-underline text-right min-w-0">
                            <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-muted-foreground/40 group-hover:text-muted-foreground transition-colors">
                                Next →
                            </span>
                            <span className="text-[13px] font-semibold text-foreground tracking-[-0.02em] truncate group-hover:text-muted-foreground transition-colors">
                                {nextProject.title}
                            </span>
                        </Link>
                    ) : <div />}

                </div>
            </nav>
        </div>
    );
}