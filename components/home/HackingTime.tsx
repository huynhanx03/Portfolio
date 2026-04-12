'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { formatDuration } from '@/lib/utils';

interface WakatimeData {
    totalTime: string;
    totalSeconds: number;
    languages: { name: string; percent: number; totalTime: string; totalSeconds: number }[];
}

const THEME_COLORS = ['#06b6d4', '#3b82f6', '#8b5cf6', '#f43f5e', '#64748b'];

export default function HackingTime() {
    const [data, setData] = useState<WakatimeData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/wakatime')
            .then((res) => res.json())
            .then((res) => {
                if (!res.error) {
                    setData({
                        totalTime: res.totalTime,
                        totalSeconds: res.totalSeconds,
                        languages: res.languages || [],
                    });
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const renderSkeleton = () => (
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-50" />
            </div>
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex items-center gap-4 mb-4">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Hacking Time</h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
                </div>
                <div className="flex items-center gap-3 mb-8">
                    <div className="h-4 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                </div>
                <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
                    <div className="h-[400px] w-full flex items-end justify-center gap-6 px-8 pb-8">
                        {[65, 40, 25, 15, 10].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-3">
                                <div className="w-full rounded-t bg-slate-200 dark:bg-slate-700 animate-pulse" style={{ height: `${h}%` }} />
                                <div className="h-3 w-12 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );

    if (loading || !data) return renderSkeleton();

    const topLanguages = data.languages.slice(0, 4);
    const otherLanguages = data.languages.slice(4);

    const chartData = [...topLanguages];
    if (otherLanguages.length > 0) {
        const otherPercent = otherLanguages.reduce((sum, lang) => sum + lang.percent, 0);
        const otherSeconds = otherLanguages.reduce((sum, lang) => sum + lang.totalSeconds, 0);
        chartData.push({
            name: 'Others',
            percent: otherPercent,
            totalTime: formatDuration(otherSeconds),
            totalSeconds: otherSeconds,
        });
    }

    const THEME_COLORS = [
        '#06b6d4', // Cyan
        '#3b82f6', // Blue
        '#8b5cf6', // Violet
        '#f43f5e', // Rose
        '#64748b', // Slate (for Others)
    ];

    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="max-w-6xl mx-auto px-6">
                <div className="flex items-center gap-4 mb-4">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Hacking Time
                    </h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
                </div>

                <div className="flex items-center gap-3 mb-8 text-muted-foreground">
                    <svg className="w-5 h-5 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">
                        <span className="font-semibold text-foreground">{data.totalTime}</span> in the last 7 days
                    </span>
                </div>

                <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 13 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    tickFormatter={(value) => `${value}%`}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)', radius: 8 }}
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            const item = payload[0].payload;
                                            return (
                                                <div className="bg-slate-900/90 backdrop-blur-md text-white text-sm rounded-lg py-2 px-3 shadow-xl border border-slate-700/50">
                                                    <div className="font-bold mb-1">{item.name}</div>
                                                    <div className="text-cyan-400">
                                                        {item.totalTime} ({item.percent}%)
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Bar
                                    dataKey="percent"
                                    radius={[4, 4, 0, 0]}
                                    barSize={40}
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={THEME_COLORS[index % THEME_COLORS.length]} opacity={0.85} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </section>
    );
}

