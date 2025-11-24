export interface Project {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    logoUrl?: string;
    demoLink?: string;
    repoLink?: string;
}

export interface ExperienceItem {
    id: string;
    role: string;
    company: string;
    period?: string;
    description: string;
    type: 'internship' | 'university' | 'certification' | 'work';
}

export interface Skill {
    name: string;
    category?: 'language' | 'framework' | 'tool' | 'niche';
}
