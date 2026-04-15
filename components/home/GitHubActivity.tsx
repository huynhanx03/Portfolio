import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { GithubStats, GithubContributionDay } from '@/lib/types';

const CONTRIBUTION_LEVELS: Record<GithubContributionDay['contributionLevel'], string> = {
    'NONE': 'bg-slate-200 dark:bg-slate-800/50',
    'FIRST_QUARTILE': 'bg-cyan-500/20',
    'SECOND_QUARTILE': 'bg-cyan-500/40',
    'THIRD_QUARTILE': 'bg-cyan-500/70',
    'FOURTH_QUARTILE': 'bg-cyan-500',
};

interface GitHubActivityProps {
    stats: GithubStats | null;
}

export default function GitHubActivity({ stats }: GitHubActivityProps) {

    if (!stats) return null;

    return (
        <section id="github-activity" className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-800/50" />

            <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/5 dark:to-blue-500/5 rounded-full blur-3xl animate-blob" />
            <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/5 dark:to-blue-500/5 rounded-full blur-3xl animate-blob animation-delay-2000" />

            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]" style={{
                backgroundImage: `linear-gradient(to right, rgb(100, 116, 139) 1px, transparent 1px), linear-gradient(to bottom, rgb(100, 116, 139) 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
            }} />

            <div className="relative max-w-6xl mx-auto px-6">
                <div className="flex items-center gap-4 mb-12">
                    <h2 className="text-3xl font-bold text-foreground shrink-0 leading-none">Activity on GitHub</h2>
                    <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20 px-3 py-1 font-mono">
                        @{stats.username}
                    </Badge>
                    <Separator className="flex-1 bg-gradient-to-r from-cyan-500/50 via-cyan-500/20 to-transparent" />
                    <div className="text-sm font-medium text-muted-foreground whitespace-nowrap bg-white/50 dark:bg-white/5 px-4 py-1.5 rounded-full border border-white/20 dark:border-white/10 flex items-center gap-2">
                        <span className="text-foreground font-bold">{stats.totalContributions.toLocaleString()}</span> submissions in the last year
                    </div>
                </div>

                <ScrollArea className="w-full whitespace-nowrap scrollbar-hide">
                    <div className="flex gap-[4px] p-2">
                        {stats.contributions.map((week, wIdx) => (
                            <div key={wIdx} className="flex flex-col gap-[4px]">
                                {week.map((day) => (
                                    <Tooltip key={day.date} delayDuration={0} disableHoverableContent={true}>
                                        <TooltipTrigger asChild>
                                            <div
                                                className={cn(
                                                    "w-[12.5px] h-[12.5px] rounded-sm transition-all duration-300 hover:scale-150 hover:z-10 hover:shadow-[0_0_12px_rgba(6,182,212,0.6)] cursor-pointer",
                                                    CONTRIBUTION_LEVELS[day.contributionLevel]
                                                )}
                                            />
                                        </TooltipTrigger>
                                        <TooltipContent
                                            sideOffset={8}
                                            className="bg-slate-950/90 border-slate-800 shadow-2xl px-3 py-2 text-[12px] backdrop-blur-md rounded-lg pointer-events-none"
                                        >
                                            <div className="flex flex-col gap-0.5">
                                                <span className="font-bold text-cyan-400">{day.contributionCount} contributions</span>
                                                <span className="text-slate-400 text-[10px]">{new Date(day.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                ))}
                            </div>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="hidden" />
                </ScrollArea>
            </div>
        </section>
    );
}
