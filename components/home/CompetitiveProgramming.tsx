import CPProfileCard from '@/components/shared/CPProfileCard';
import OtherPlatformsCard from '@/components/shared/OtherPlatformsCard';
import type { CodeforcesStats, LeetCodeStats, OtherPlatform } from '@/lib/types';

interface CompetitiveProgrammingProps {
    codeforces: CodeforcesStats | null;
    codeforcesError?: string | null;
    leetcode: LeetCodeStats | null;
    leetcodeError?: string | null;
    otherPlatforms: OtherPlatform[];
}

// Renders the Competitive Programming section with API-powered cards and static platform chips.
export default function CompetitiveProgramming({
    codeforces,
    codeforcesError,
    leetcode,
    leetcodeError,
    otherPlatforms,
}: CompetitiveProgrammingProps) {
    // Calculate total problems solved across all platforms
    const totalSolved =
        (codeforces?.problemsSolved || 0) +
        (leetcode?.problemsSolved || 0) +
        otherPlatforms.reduce((sum, platform) => sum + (platform.problemsSolved || 0), 0);

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
                        username={codeforces?.username || 'unavailable'}
                        rating={codeforces?.rating}
                        maxRating={codeforces?.maxRating}
                        rank={codeforces?.rank}
                        maxRank={codeforces?.maxRank}
                        problemsSolved={codeforces?.problemsSolved || 0}
                        profileUrl={codeforces?.profileUrl || '#'}
                        isLoading={false}
                        error={codeforcesError || undefined}
                    />

                    {/* LeetCode Card */}
                    <CPProfileCard
                        platform="leetcode"
                        username={leetcode?.username || 'unavailable'}
                        rating={leetcode?.rating}
                        topPercentage={leetcode?.topPercentage}
                        problemsSolved={leetcode?.problemsSolved || 0}
                        totalProblems={leetcode?.totalProblems}
                        profileUrl={leetcode?.profileUrl || '#'}
                        isLoading={false}
                        error={leetcodeError || undefined}
                    />

                    {/* Other Platforms Card */}
                    <OtherPlatformsCard platforms={otherPlatforms} />
                </div>
            </div>
        </section>
    );
}
