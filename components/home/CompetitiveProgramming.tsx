'use client';

import { useEffect, useState } from 'react';
import CPProfileCard from '@/components/shared/CPProfileCard';
import OtherPlatformsCard from '@/components/shared/OtherPlatformsCard';
import type { CodeforcesStats, LeetCodeStats, OtherPlatform } from '@/lib/types';

interface CPState<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
}

// Renders the Competitive Programming section with API-powered cards and static platform chips.
export default function CompetitiveProgramming() {
    const [codeforces, setCodeforces] = useState<CPState<CodeforcesStats>>({
        data: null,
        isLoading: true,
        error: null,
    });
    const [leetcode, setLeetcode] = useState<CPState<LeetCodeStats>>({
        data: null,
        isLoading: true,
        error: null,
    });
    const [otherPlatforms, setOtherPlatforms] = useState<OtherPlatform[]>([]);

    useEffect(() => {
        // Fetch Codeforces stats
        fetch('/api/codeforces')
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setCodeforces({ data: null, isLoading: false, error: data.error });
                } else {
                    setCodeforces({ data, isLoading: false, error: null });
                }
            })
            .catch(() => {
                setCodeforces({ data: null, isLoading: false, error: 'Failed to load' });
            });

        // Fetch LeetCode stats
        fetch('/api/leetcode')
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setLeetcode({ data: null, isLoading: false, error: data.error });
                } else {
                    setLeetcode({ data, isLoading: false, error: null });
                }
            })
            .catch(() => {
                setLeetcode({ data: null, isLoading: false, error: 'Failed to load' });
            });

        // Fetch other platforms (static data)
        fetch('/api/other-platforms')
            .then((res) => res.json())
            .then((data) => {
                if (!data.error) {
                    setOtherPlatforms(data);
                }
            })
            .catch(() => {
                // Silently fail for static platforms
            });
    }, []);

    // Calculate total problems solved across all platforms
    const totalSolved =
        (codeforces.data?.problemsSolved || 0) +
        (leetcode.data?.problemsSolved || 0) +
        otherPlatforms.reduce((sum, platform) => sum + (platform.problemsSolved || 0), 0);

    const totalPlatforms = 2 + otherPlatforms.length;

    return (
        <section id="competitive-programming" className="py-20">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex items-center gap-4 mb-4">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Competitive Programming
                    </h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
                </div>

                {/* Total Stats Bar */}
                <div className="flex items-center gap-3 mb-8 text-muted-foreground">
                    <svg className="w-5 h-5 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <span className="text-sm">
                        <span className="font-semibold text-foreground">{totalSolved.toLocaleString()}</span> problems solved
                    </span>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Codeforces Card */}
                    <CPProfileCard
                        platform="codeforces"
                        username={codeforces.data?.username || 'loading...'}
                        rating={codeforces.data?.rating}
                        maxRating={codeforces.data?.maxRating}
                        rank={codeforces.data?.rank}
                        maxRank={codeforces.data?.maxRank}
                        problemsSolved={codeforces.data?.problemsSolved || 0}
                        profileUrl={codeforces.data?.profileUrl || '#'}
                        isLoading={codeforces.isLoading}
                        error={codeforces.error || undefined}
                    />

                    {/* LeetCode Card */}
                    <CPProfileCard
                        platform="leetcode"
                        username={leetcode.data?.username || 'loading...'}
                        rating={leetcode.data?.rating}
                        topPercentage={leetcode.data?.topPercentage}
                        problemsSolved={leetcode.data?.problemsSolved || 0}
                        totalProblems={leetcode.data?.totalProblems}
                        profileUrl={leetcode.data?.profileUrl || '#'}
                        isLoading={leetcode.isLoading}
                        error={leetcode.error || undefined}
                    />

                    {/* Other Platforms Card */}
                    <OtherPlatformsCard platforms={otherPlatforms} />
                </div>
            </div>
        </section>
    );
}
