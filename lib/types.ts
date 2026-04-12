// Site config types
export interface SiteConfig {
    name: string;
    role: string;
    summary: string;
    links: {
        email: string;
        github: string;
        linkedin: string;
    };
    seo: {
        title: string;
        description: string;
        keywords: string[];
    };
}

// Skills types
export interface SkillSubcategory {
    name: string;
    skills: string[];
}

export interface SkillCategory {
    name: string;
    skills?: string[];
    subcategories?: SkillSubcategory[];
}

export interface SkillsData {
    categories: SkillCategory[];
}

// Project types
export type ProjectCategory = 'personal' | 'contribution';

export interface PullRequest {
    title: string;
    url: string;
    number: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    techStack: string[];
    role: string;
    github: string | null;
    demo: string | null;
    image: string | null;
    category: ProjectCategory;
    hidden?: boolean;
    pullRequests?: PullRequest[];
    stars?: number;
}

export interface ProjectsData {
    projects: Project[];
}

// Achievement types (Certificates & Awards)
export interface Achievement {
    id: string;
    name: string;
    issuer: string;
    year: number;
    type: 'certificate' | 'award';
    credentialUrl: string | null;
    image: string | null;
}

export interface AchievementsData {
    achievements: Achievement[];
}

// Competitive Programming types
export interface CPPlatformConfig {
    username: string;
    profileUrl: string;
}

export interface OtherPlatform {
    name: string;
    username: string;
    profileUrl: string;
    problemsSolved?: number;
}

export interface CompetitiveData {
    platforms: {
        codeforces: CPPlatformConfig;
        leetcode: CPPlatformConfig;
    };
    otherPlatforms: OtherPlatform[];
}

// API Response types
export interface CodeforcesStats {
    platform: 'codeforces';
    username: string;
    rating: number;
    maxRating: number;
    rank: string;
    maxRank: string;
    problemsSolved: number;
    profileUrl: string;
}

export interface LeetCodeStats {
    platform: 'leetcode';
    username: string;
    rating: number;
    topPercentage?: number;
    problemsSolved: number;
    totalProblems: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    profileUrl: string;
}

export type CPStats = CodeforcesStats | LeetCodeStats;

// GitHub types
export interface GithubContributionDay {
    color: string;
    contributionCount: number;
    contributionLevel: 'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE';
    date: string;
}

export interface GithubStats {
    username: string;
    contributions: GithubContributionDay[][];
    totalContributions: number;
}

// Experience types
export interface ExperienceRole {
    title: string;
    period: string;
    description: string;
}

export interface Experience {
    company: string;
    roles: ExperienceRole[];
}

export interface ExperienceData {
    experiences: Experience[];
}
