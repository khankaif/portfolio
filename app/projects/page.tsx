import { getProjects } from "@/lib/projects";
import PageShell from "@/components/layout/PageShell";
import PageHeader from "@/components/layout/PageHeader";
import LiquidWorkList from "@/components/liquid/LiquidWorkList";

// Production systems pour pale blue; design and in-progress work lavender.
const LAVENDER = new Set(["zefyron-saas-platform", "aethra"]);

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

                <LiquidWorkList
                    projects={projects.map(({ slug, meta }) => ({
                        slug,
                        title: meta.title,
                        description: meta.description,
                        role: meta.role,
                        year: meta.date.slice(0, 4),
                        stack: meta.stack ?? [],
                        hue: LAVENDER.has(slug) ? 1 : 0,
                    }))}
                />
            </section>
        </PageShell>
    );
}
