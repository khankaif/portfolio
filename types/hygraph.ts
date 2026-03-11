export interface HygraphAsset {
    url: string;
    mimeType?: string;
    width?: number;
    height?: number;
}

export interface HygraphProject {
    id: string;
    title: string;
    slug: string;
    date: string;
    description: string;
    longDescription?: string;
    projectUrl?: string;
    role?: string[];
    podTeam?: string[];
    solutions?: string;
    results?: string;
    media: HygraphAsset[];
}

export interface ProjectQueryResponse {
    projects: HygraphProject[];
}

export interface SingleProjectQueryResponse {
    project: HygraphProject | null;
}
