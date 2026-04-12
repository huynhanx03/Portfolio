import { promises as fs } from "fs";
import path from "path";
import type { Metadata } from "next";
import ProjectCard from "@/components/shared/ProjectCard";
import type { ProjectsData } from "@/lib/types";

export const metadata: Metadata = {
    title: "Projects | Huỳnh Mai Cao Nhân",
    description: "Personal and academic projects showcasing backend development, distributed systems, and software engineering expertise.",
};

async function getProjects(): Promise<ProjectsData> {
    const filePath = path.join(process.cwd(), "data", "projects.json");
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
}

async function getStars(repoUrl: string): Promise<number | undefined> {
    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) return undefined;
    
    const owner = match[1];
    const repo = match[2];
    
    try {
        const headers: HeadersInit = {
            'Accept': 'application/vnd.github.v3+json',
        };
        if (process.env.GITHUB_TOKEN) {
            headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
        }

        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
            headers,
            next: { revalidate: 3600 } // Cache for 1 hour on the server
        });
        
        if (!res.ok) return undefined;
        
        const data = await res.json();
        return data.stargazers_count;
    } catch (e) {
        return undefined; // Graceful degradation
    }
}

export default async function ProjectsPage() {
    const { projects: rawProjects } = await getProjects();

    // Fetch GitHub stars for projects
    const projects = await Promise.all(rawProjects.map(async (p) => {
        if (p.github) {
            const stars = await getStars(p.github);
            if (stars !== undefined) {
                p.stars = stars;
            }
        }
        return p;
    }));

    const visibleProjects = projects.filter(p => !p.hidden);
    const personalProjects = visibleProjects.filter(p => p.category === 'personal');
    const contributions = visibleProjects.filter(p => p.category === 'contribution');

    return (
        <div className="py-20">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        My Work
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        A collection of personal projects and contributions to the open-source community.
                    </p>
                </div>

                {/* Open Source Contributions Section */}
                {contributions.length > 0 && (
                    <section className="mb-20">
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                                Open Source
                            </h2>
                            <div className="h-px flex-grow bg-slate-200 dark:bg-slate-800" />
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {contributions.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Personal Projects Section */}
                {personalProjects.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                                Personal Projects
                            </h2>
                            <div className="h-px flex-grow bg-slate-200 dark:bg-slate-800" />
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {personalProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Empty State */}
                {projects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-500 dark:text-slate-400">
                            No projects to display yet.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
