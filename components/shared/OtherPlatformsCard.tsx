import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { OtherPlatform } from '@/lib/types';

interface OtherPlatformsCardProps {
    platforms: OtherPlatform[];
}

// Renders a single card containing clickable chips for platforms without APIs.
export default function OtherPlatformsCard({ platforms }: OtherPlatformsCardProps) {
    return (
        <Card className="h-full bg-card/50 border-border/50 transition-all duration-300">
            <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                    <div className="text-cyan-500">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                    </div>
                    <CardTitle className="text-base">Others</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-2">
                {platforms.map((platform) => (
                    <PlatformChip key={platform.name} platform={platform} />
                ))}
            </CardContent>
        </Card>
    );
}

// Renders a single clickable chip for a platform entry.
function PlatformChip({ platform }: { platform: OtherPlatform }) {
    return (
        <Link
            href={platform.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-3 py-2 rounded-md border border-border/50 bg-background/50 hover:border-cyan-500/50 hover:bg-cyan-500/5 hover:scale-[1.01] transition-all duration-200"
        >
            <div className="text-muted-foreground group-hover:text-cyan-500 transition-colors shrink-0">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="font-medium text-sm text-foreground group-hover:text-cyan-500 transition-colors">
                        {platform.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        @{platform.username}
                    </span>
                    {platform.problemsSolved !== undefined && (
                        <span className="text-xs text-muted-foreground">
                            · {platform.problemsSolved} solved
                        </span>
                    )}
                </div>
            </div>
            <div className="text-muted-foreground group-hover:text-cyan-500 transition-colors shrink-0">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
            </div>
        </Link>
    );
}
