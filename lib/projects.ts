import fs from "node:fs";
import path from "node:path";

export interface ProjectMeta {
    title: string;
    description: string;
    date: string;
    /** Position on the work and about pages; lower comes first. */
    order: number;
    role: string;
    team: string;
    timeline: string;
    url?: string;
    hero?: string;
    stats?: { value: string; label: string }[];
    stack?: string[];
}

const DIR = path.join(process.cwd(), "content/projects");

export function getSlugs() {
    return fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
}

export async function getProject(slug: string) {
    if (!getSlugs().includes(slug)) return null;
    const mod = await import(`@/content/projects/${slug}.mdx`);
    return { slug, meta: mod.meta as ProjectMeta, Content: mod.default as React.ComponentType };
}

// By `order`, so the strongest work leads regardless of date.
export async function getProjects() {
    const all = await Promise.all(getSlugs().map(getProject));
    return all.filter((p) => p !== null).sort((a, b) => a.meta.order - b.meta.order);
}
