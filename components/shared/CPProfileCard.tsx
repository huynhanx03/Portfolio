import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Color mapping for Codeforces ranks
const rankColors: Record<string, string> = {
    'newbie': '#808080',
    'pupil': '#008000',
    'specialist': '#03a89e',
    'expert': '#0000ff',
    'candidate master': '#aa00aa',
    'master': '#ff8c00',
    'international master': '#ff8c00',
    'grandmaster': '#ff0000',
    'international grandmaster': '#ff0000',
    'legendary grandmaster': '#ff0000',
    'unrated': '#808080',
};

interface CPProfileCardProps {
    platform: string;
    username: string;
    rating?: number;
    maxRating?: number; // Kept in interface but not used in display as requested
    rank?: string;
    maxRank?: string; // Kept in interface but not used in display as requested
    problemsSolved: number;
    totalProblems?: number;
    topPercentage?: number;
    profileUrl: string;
    isLoading?: boolean;
    error?: string;
}

export default function CPProfileCard({
    platform,
    username,
    rating,
    rank,
    problemsSolved,
    totalProblems,
    topPercentage,
    profileUrl,
    isLoading,
    error,
}: CPProfileCardProps) {
    const platformIcons: Record<string, React.ReactNode> = {
        codeforces: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z" />
            </svg>
        ),
        leetcode: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
            </svg>
        ),
        cses: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
    };

    const platformLabels: Record<string, string> = {
        codeforces: 'Codeforces',
        leetcode: 'LeetCode',
        cses: 'CSES Problem Set',
    };

    // Determine color based on rank for Codeforces, or fallback
    const rankColor = rank ? (rankColors[rank.toLowerCase()] || '#808080') : undefined;

    return (
        <Link href={profileUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
            <Card className="group h-full bg-card/50 border-border/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer">
                <CardHeader className="pb-3">
                    <div className="flex items-center gap-4">
                        <div className="text-cyan-500 group-hover:scale-110 transition-transform duration-300">
                            {platformIcons[platform]}
                        </div>
                        <div>
                            <CardTitle className="text-lg group-hover:text-cyan-500 transition-colors">
                                {platformLabels[platform]}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">@{username}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="space-y-2 animate-pulse">
                            <div className="h-4 bg-muted rounded w-2/3" />
                            <div className="h-4 bg-muted rounded w-1/2" />
                        </div>
                    ) : error ? (
                        <p className="text-sm text-destructive">{error}</p>
                    ) : (
                        <div className="space-y-2">
                            {rating !== undefined && (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">Rating:</span>
                                    <span
                                        className={`font-bold text-lg ${!rankColor ? 'text-slate-900 dark:text-white' : ''}`}
                                        style={rankColor ? { color: rankColor } : {}}
                                    >
                                        {rating}
                                    </span>
                                    {rank && (
                                        <span
                                            className="text-sm font-medium capitalize ml-1 border rounded px-1.5 py-0.5"
                                            style={{
                                                color: rankColor,
                                                borderColor: `${rankColor}40`,
                                                backgroundColor: `${rankColor}10`
                                            }}
                                        >
                                            {rank}
                                        </span>
                                    )}
                                    {!rank && topPercentage !== undefined && (
                                        <span
                                            className="text-xs font-medium ml-1 border rounded px-1.5 py-0.5 text-cyan-500 border-cyan-500/40 bg-cyan-500/10"
                                        >
                                            Top {topPercentage}%
                                        </span>
                                    )}
                                </div>
                            )}


                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Solved:</span>
                                <span className="font-semibold text-foreground">
                                    {problemsSolved}
                                </span>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}
