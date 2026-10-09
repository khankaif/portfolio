import { getProjects } from "@/lib/projects";
import PageShell from "@/components/layout/PageShell";
import PageHeader from "@/components/layout/PageHeader";
import ProjectList from "@/components/ProjectList";

export const metadata = {
    title: "Work",
    description: "Detailed case studies on systems, operations, and platforms I've designed and shipped.",
};

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

                <ProjectList projects={projects.map(({ slug, meta }) => ({ slug, meta }))} />
            </section>
        </PageShell>
    );
}
