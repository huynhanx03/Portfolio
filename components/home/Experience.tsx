'use client';

import type { Experience } from '@/lib/types';

interface ExperienceTimelineProps {
    experiences: Experience[];
}

// Renders the Experience section with a left-right split timeline layout.
// Uses flexbox rows with a single absolutely-positioned continuous line for perfect alignment.
export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
    // Flatten all roles into a single list so the timeline is one continuous sequence.
    const entries = experiences.flatMap((exp) =>
        exp.roles.map((role, roleIdx) => ({
            company: exp.company,
            role,
            isFirstRole: roleIdx === 0,
        }))
    );

    return (
        <section id="experience" className="py-20">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section header */}
                <div className="flex items-center gap-4 mb-16">
                    <h2 className="text-3xl font-bold text-foreground">
                        Experience
                    </h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Single continuous vertical line */}
                    <div
                        className="hidden md:block absolute w-px bg-gradient-to-b from-cyan-500/40 via-cyan-500/25 to-cyan-500/10"
                        style={{
                            left: 'calc(33.333% + 0.625rem)',
                            top: '0.5rem',
                            bottom: '0.5rem',
                        }}
                    />

                    {entries.map((entry, idx) => {
                        const isLast = idx === entries.length - 1;
                        const isNewCompany = entry.isFirstRole && idx > 0;

                        return (
                            <div
                                key={`${entry.company}-${entry.role.title}`}
                                className={`group relative flex ${isNewCompany ? 'mt-10' : ''} ${!isLast ? 'mb-4' : ''}`}
                            >
                                {/* Left: Period */}
                                <div className="hidden md:flex w-1/3 flex-shrink-0 justify-end items-start pt-1 pr-8">
                                    <span className="text-sm font-medium text-muted-foreground group-hover:text-cyan-500 transition-colors duration-300">
                                        {entry.role.period}
                                    </span>
                                </div>

                                {/* Center: Dot */}
                                <div className="hidden md:flex w-5 flex-shrink-0 justify-center items-start relative z-10">
                                    <div className="mt-1.5">
                                        {entry.isFirstRole ? (
                                            <div className="relative">
                                                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/40 group-hover:shadow-cyan-400/70 group-hover:scale-125 transition-all duration-300" />
                                                <div className="absolute inset-0 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 animate-ping opacity-20" />
                                            </div>
                                        ) : (
                                            <div className="w-2.5 h-2.5 rounded-full bg-cyan-500/40 border border-cyan-500/30 group-hover:bg-cyan-400 group-hover:border-cyan-400/50 transition-all duration-300" />
                                        )}
                                    </div>
                                </div>

                                {/* Right: Content card */}
                                <div className="flex-1 md:pl-8">
                                    {/* Mobile: Period */}
                                    <div className="md:hidden flex items-center gap-3 mb-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30 flex-shrink-0" />
                                        <span className="text-xs font-medium text-muted-foreground">
                                            {entry.role.period}
                                        </span>
                                    </div>

                                    {/* Ethereal glassmorphism card */}
                                    <div className="relative rounded-xl bg-white/30 dark:bg-slate-800/30 backdrop-blur-xl border border-white/15 dark:border-slate-500/10 p-5 group-hover:bg-white/50 dark:group-hover:bg-slate-800/50 group-hover:border-white/25 dark:group-hover:border-cyan-500/15 group-hover:shadow-2xl group-hover:shadow-cyan-500/[0.08] transition-all duration-500">
                                        {/* Inner gradient shimmer */}
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/[0.03] via-transparent to-blue-500/[0.02] group-hover:from-cyan-500/[0.06] group-hover:to-blue-500/[0.04] transition-all duration-500 pointer-events-none" />

                                        {/* Accent border left on hover */}
                                        <div className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full bg-gradient-to-b from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

                                        {/* Company badge — first role only */}
                                        {entry.isFirstRole && (
                                            <div className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/[0.08] border border-cyan-500/[0.15] mb-3">
                                                <svg className="w-3.5 h-3.5 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                                <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                                                    {entry.company}
                                                </span>
                                            </div>
                                        )}

                                        {/* Role title */}
                                        <h3 className="relative text-lg font-semibold text-foreground mb-1.5">
                                            {entry.role.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="relative text-sm text-muted-foreground leading-relaxed">
                                            {entry.role.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
