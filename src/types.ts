export interface Project {
    title: string;
    logo: string;
    tech: string[];
    description: string;
    buttons: {
        label: string;
        url: string;
    }[];
}

export interface ExperienceItem {
    id: string;
    role: string;
    company: string;
    period?: string;
    description: string;
    type: 'internship' | 'university' | 'certification' | 'work';
    highlight?: string;
    footerNote?: string;
    footerIcon?: 'check' | 'academic' | 'chart';
}

export interface Skill {
    name: string;
    category?: 'language' | 'framework' | 'tool' | 'niche';
}
