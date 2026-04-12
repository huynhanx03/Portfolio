import { NextResponse } from 'next/server';
import { formatDuration } from '@/lib/utils';

export const runtime = 'edge';

export async function GET() {
    const API_KEY = process.env.WAKATIME_API_KEY;

    if (!API_KEY) {
        return NextResponse.json(
            { error: 'Wakatime API Key not found' },
            { status: 500 }
        );
    }

    try {
        const response = await fetch(
            `https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key=${API_KEY}`,
            { cache: 'no-store' }
        );
        const { data } = await response.json();

        const totalSeconds = data?.total_seconds || 0;
        const languages = (data?.languages || []).map((lang: any) => ({
            name: lang.name,
            percent: lang.percent,
            totalSeconds: lang.total_seconds,
            totalTime: formatDuration(lang.total_seconds),
        }));

        return NextResponse.json({
            totalTime: formatDuration(totalSeconds),
            totalSeconds,
            languages,
        });
    } catch (error) {
        console.error('Error fetching Wakatime data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Wakatime data' },
            { status: 500 }
        );
    }
}
