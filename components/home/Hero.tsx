import Link from 'next/link';
import Image from 'next/image';
import type { SiteConfig } from '@/lib/types';

interface HeroProps {
    config: SiteConfig;
}

/**
 * Hero section with split layout: text content on the left, chibi avatar on the right.
 * Clean design with a short tagline, CTA button, and rotating neon glow around the avatar.
 */
export default function Hero({ config }: HeroProps) {
    return (
        <section className="min-h-[75vh] flex items-center justify-center py-16 relative overflow-hidden">
            {/* Decorative gradient blur background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-blob" />
                <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl animate-blob animation-delay-2000" />
                <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
            </div>

            <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                {/* Left column — Text content */}
                <div className="order-2 lg:order-1 text-center lg:text-left">
                    {/* Greeting badge */}
                    <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-base font-medium mb-4">
                        <span className="text-lg">👋</span>
                        <span>Hello World</span>
                    </div>

                    {/* Name headline */}
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl font-bold mb-2 leading-tight">
                        <span className="text-slate-300">I&apos;m </span>
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent typing-cursor pr-1">
                            {config.name.split(' ').pop()}
                        </span>
                        <span className="text-cyan-400">.</span>
                    </h1>

                    {/* Role */}
                    <p className="text-2xl md:text-3xl font-semibold text-slate-400 mb-6">
                        {config.role}
                    </p>

                    {/* Tagline — short, memorable motto */}
                    <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-md mb-12 italic leading-relaxed">
                        &ldquo;{config.summary}&rdquo;
                    </p>

                    {/* CTA + Social links */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 lg:justify-start justify-center">
                        {/* CTA Button */}
                        <Link
                            href="/projects"
                            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 cursor-pointer"
                        >
                            View My Projects
                            <svg
                                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>

                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            <Link
                                href={config.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all duration-200 cursor-pointer"
                                aria-label="GitHub"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </Link>
                            <Link
                                href={config.links.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all duration-200 cursor-pointer"
                                aria-label="LinkedIn"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </Link>
                            <Link
                                href={`mailto:${config.links.email}`}
                                className="p-2.5 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all duration-200 cursor-pointer"
                                aria-label="Email"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right column — Avatar with rotating glow ring */}
                <div className="order-1 lg:order-2 flex justify-center">
                    <div className="avatar-glow-wrapper w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full">
                        {config.avatar ? (
                            <Image
                                src={config.avatar}
                                alt={`${config.name} avatar`}
                                width={320}
                                height={320}
                                className="rounded-full object-cover w-full h-full"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
                                <span className="text-6xl font-bold text-cyan-400">
                                    {config.name.charAt(0)}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
