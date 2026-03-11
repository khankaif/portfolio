import Link from "next/link";
import { hygraphClient } from '@/lib/hygraph';
import { ProjectQueryResponse, HygraphProject } from '@/types/hygraph';
import { gql } from 'graphql-request';

// ── Card Component ────────────────────────────────────────────────────────────

function CraftCard({ project }: { project: HygraphProject }) {
    // Collect media
    const firstMedia = project.media?.[0];
    const imageUrl = firstMedia?.mimeType?.startsWith('image/') ? firstMedia.url : "";
    const videoUrl = project.media?.find(m => m.mimeType?.startsWith('video/'))?.url || "";

    const dateDisplay = project.date
        ? new Date(project.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })
        : "";

    return (
        <div className="w-full mx-auto p-4 pl-0 pr-0 sm:p-2">
            <Link
                href={`/projects/${project.slug}`}
                aria-label={project.title}
                className="group relative block w-full overflow-hidden rounded-xl border border-border bg-background p-1 transition-all hover:border-gray-300 dark:border-gray-800 dark:bg-stone-900/50"
            >
                <div
                    className="relative w-full overflow-hidden rounded-lg bg-muted aspect-video"
                >
                    {/* Background Blurred Image */}
                    {imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            aria-hidden="true"
                            className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl opacity-50 dark:opacity-30"
                            src={imageUrl}
                            alt=""
                        />
                    )}

                    {/* Foreground Media */}
                    {videoUrl ? (
                        <video
                            playsInline
                            loop
                            autoPlay
                            muted
                            className="relative h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                            src={videoUrl}
                        />
                    ) : imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            className="relative h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                            src={imageUrl}
                            alt={project.title}
                        />
                    ) : (
                        <div className="relative flex h-full items-center justify-center bg-muted">
                            <span className="text-sm font-medium opacity-50 uppercase tracking-widest">{project.title}</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between px-2 py-3">
                    <span className="text-sm font-medium text-foreground">
                        {project.title}
                    </span>
                    <span className="text-sm font-normal text-muted-foreground">
                        {dateDisplay}
                    </span>
                </div>

                <div
                    className="flex h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-muted text-sm font-medium text-foreground transition-colors group-hover:bg-accent hover:text-accent-foreground"
                >
                    View Project
                </div>
            </Link>
        </div>
    );
}

// ── Page Component ────────────────────────────────────────────────────────────

export const revalidate = 60; // Revalidate every 60 seconds

// The GraphQL query to fetch all projects
const GET_ALL_PROJECTS = gql`
  query GetAllProjects {
    projects(orderBy: date_DESC) {
      id
      title
      slug
      date
      description
      media {
        url
        mimeType
      }
    }
  }
`;

export default async function ProjectsPage() {
    let projects: HygraphProject[] = [];

    try {
        const data = await hygraphClient.request<ProjectQueryResponse>(GET_ALL_PROJECTS);
        projects = data.projects;
    } catch (error) {
        console.error("Failed to fetch projects from Hygraph:", error);
    }

    return (
        <div className="min-h-screen pt-24 pb-32 bg-background font-sans">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-[40px]">
                {/* Responsive CSS columns for masonry layout */}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
                    {projects.map((project) => (
                        <div key={project.id} className="break-inside-avoid mb-6">
                            <CraftCard project={project} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}