export interface Project {
    title: string;
    logo: string;
    tech: string[];
    categories: string[];
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
    tags?: string[];
    dailyTech?: string[];
    /** Decimal-year range for the Gantt view, e.g. 2025.6 = Aug 2025 */
    gantt?: { start: number; end: number };
    certs?: { name: string; description: string }[];
}
