'use client';

import { GitPullRequest, GitMerge, ChevronRight } from 'lucide-react';
import type { PullRequest } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProjectPRModalProps {
  projectName: string;
  pullRequests: PullRequest[];
}

export default function ProjectPRModal({ projectName, pullRequests }: ProjectPRModalProps) {
  if (!pullRequests || pullRequests.length === 0) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          role="button"
          className="relative z-20 flex-shrink-0 p-2.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-500 transition-colors cursor-pointer"
          title="View Pull Requests"
        >
          <GitPullRequest className="w-5 h-5" />
        </div>
      </DialogTrigger>
      <DialogContent 
        onClick={(e) => e.stopPropagation()} 
        className="sm:max-w-[700px] border-cyan-500/20 bg-background/95 backdrop-blur-md"
      >
        <DialogHeader>
          <DialogTitle>Contributions to {projectName}</DialogTitle>
          <DialogDescription>
            A list of pull requests merged or submitted to this open-source project.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] mt-4 pr-4">
          <div className="flex flex-col gap-4">
            {pullRequests.map((pr, index) => (
              <a
                key={index}
                href={pr.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()} 
                className="group relative flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-slate-900/50 hover:bg-slate-800/80 hover:border-purple-500/20 transition-all duration-500 overflow-hidden"
              >
                {/* Subtle Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon: Merged style */}
                <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                  <GitMerge className="w-4 h-4" />
                </div>

                {/* Main Content */}
                <div className="relative z-10 flex-1 min-w-0 pr-4">
                  <h4 className="text-sm md:text-base font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors truncate">
                    {pr.title}
                  </h4>
                  <div className="flex items-center mt-2.5">
                    <span className="flex items-center text-[10px] uppercase tracking-wider font-bold text-purple-400 bg-purple-500/10 rounded-md border border-purple-500/20 overflow-hidden">
                      <span className="px-2 py-0.5">Merged</span>
                      <span className="px-2 py-0.5 bg-purple-500/20 border-l border-purple-500/30 font-mono text-purple-200">
                        {pr.number.startsWith('#') ? pr.number : `#${pr.number}`}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Animated Arrow */}
                <div className="relative z-10 flex-shrink-0 text-slate-600 group-hover:text-cyan-400 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </a>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
