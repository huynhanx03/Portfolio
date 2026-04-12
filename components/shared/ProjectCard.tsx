'use client';

import type { Project } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProjectPRModal from './ProjectPRModal';

interface ProjectCardProps {
    project: Project;
}

const DEFAULT_IMAGE = "/images/projects/unknown.png";

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Card 
            onClick={() => {
                if (project.github) {
                    window.open(project.github, '_blank', 'noopener,noreferrer');
                }
            }}
            className="group flex flex-col h-full bg-card/50 border-border/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 overflow-hidden relative cursor-pointer p-0 gap-0"
        >
            {/* Project Image */}
            <div className="relative block h-48 w-full overflow-hidden bg-muted flex-shrink-0">
                <Image
                    src={project.image || DEFAULT_IMAGE}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            <CardContent className="p-5 flex flex-col flex-1">
                {/* Header: Title + Actions */}
                <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="block">
                        <h3 className="text-xl font-semibold group-hover:text-cyan-500 transition-colors">
                            {project.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-0.5">{project.role}</p>
                    </div>

                    <div 
                        className="flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()} // Stop click on actions from opening card url
                    >
                        {project.stars !== undefined && (
                            <div 
                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 font-semibold cursor-default hover:bg-amber-500/20 transition-colors"
                                title={`${project.stars.toLocaleString()} GitHub Stars`}
                            >
                                <svg className="w-4 h-4 fill-amber-500" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                                <span className="text-xs">
                                    {project.stars > 999 ? (project.stars / 1000).toFixed(1) + 'k' : project.stars}
                                </span>
                            </div>
                        )}
                        {project.pullRequests && project.pullRequests.length > 0 && (
                            <ProjectPRModal projectName={project.name} pullRequests={project.pullRequests} />
                        )}
                        {project.github && (
                            <Link 
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0 p-2.5 rounded-lg bg-muted/50 hover:bg-cyan-500/10 transition-colors group/link"
                            >
                                <svg className="w-5 h-5 text-muted-foreground group-hover/link:text-cyan-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                    {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-2">
                    {project.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
