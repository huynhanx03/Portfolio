'use client';

import type { SkillCategory } from '@/lib/types';
import * as SimpleIcons from 'simple-icons';

interface SkillsProps {
    categories: SkillCategory[];
}

// Flatten all skills from categories
function getAllSkills(categories: SkillCategory[]): string[] {
    const skills: string[] = [];
    categories.forEach((category) => {
        if (category.skills) {
            skills.push(...category.skills);
        }
        if (category.subcategories) {
            category.subcategories.forEach((sub) => {
                skills.push(...sub.skills);
            });
        }
    });
    return skills;
}

// Map skill names to simple-icons
const skillToIcon: Record<string, string> = {
    'Go': 'siGo',
    'Rust': 'siRust',
    'Java': 'siOpenjdk',
    'C/C++': 'siCplusplus',
    'Spring Boot': 'siSpringboot',
    'MySQL': 'siMysql',
    'PostgreSQL': 'siPostgresql',
    'ClickHouse': 'siClickhouse',
    'MongoDB': 'siMongodb',
    'Redis': 'siRedis',
    'Elasticsearch': 'siElasticsearch',
    'RESTful': 'siFastapi',
    'gRPC': 'siGrpc',
    'Kafka': 'siApachekafka',
    'Git': 'siGit',
    'Docker': 'siDocker',
    'HTML': 'siHtml5',
    'CSS': 'siCss3',
};

interface SkillIconProps {
    name: string;
}

function SkillIcon({ name }: SkillIconProps) {
    const iconKey = skillToIcon[name];
    const icon = iconKey ? (SimpleIcons as any)[iconKey] : null;

    if (!icon) {
        return (
            <div className="group relative flex items-center justify-center h-20 min-w-[80px] px-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 text-slate-600 dark:text-slate-300 transition-transform hover:scale-110">
                    <span className="text-xs font-bold">{name.slice(0, 2)}</span>
                </div>
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs text-slate-600 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {name}
                </span>
            </div>
        );
    }

    return (
        <div className="group relative flex items-center justify-center h-20 min-w-[80px] px-4">
            <div
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 transition-transform hover:scale-110"
                style={{ color: `#${icon.hex}` }}
            >
                <svg
                    role="img"
                    viewBox="0 0 24 24"
                    className="w-8 h-8"
                    fill="currentColor"
                >
                    <path d={icon.path} />
                </svg>
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs text-slate-600 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {name}
            </span>
        </div>
    );
}

export default function Skills({ categories }: SkillsProps) {
    const allSkills = getAllSkills(categories);
    // Triple the array for seamless loop
    const repeatedSkills = [...allSkills, ...allSkills, ...allSkills];

    return (
        <section id="skills" className="relative py-20 overflow-hidden">
            {/* Gradient background with animated blobs */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-800/50" />

            {/* Animated gradient orbs */}
            <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/5 dark:to-blue-500/5 rounded-full blur-3xl animate-blob" />
            <div className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-500/5 rounded-full blur-3xl animate-blob animation-delay-2000" />
            <div className="absolute -bottom-10 left-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/5 dark:to-cyan-500/5 rounded-full blur-3xl animate-blob animation-delay-4000" />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]" style={{
                backgroundImage: `
          linear-gradient(to right, rgb(100, 116, 139) 1px, transparent 1px),
          linear-gradient(to bottom, rgb(100, 116, 139) 1px, transparent 1px)
        `,
                backgroundSize: '40px 40px'
            }} />

            <div className="relative max-w-6xl mx-auto px-6">
                <div className="flex items-center gap-4 mb-12">
                    <h2 className="text-3xl font-bold text-foreground">
                        Skills & Technologies
                    </h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
                </div>

                {/* Single Infinite Marquee */}
                <div className="relative">
                    <div className="flex gap-0 animate-marquee">
                        {repeatedSkills.map((skill, idx) => (
                            <SkillIcon key={`${skill}-${idx}`} name={skill} />
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100% / 3));
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-marquee {
          animation: marquee 60s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }

        .animate-blob {
          animation: blob 20s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
        </section>
    );
}
