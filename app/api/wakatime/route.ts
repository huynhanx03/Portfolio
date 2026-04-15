import { jsonError, jsonWithCache } from '@/lib/http';
import { getWakatimeStats } from '@/lib/stats';

export const runtime = 'edge';
export const revalidate = 900;

export async function GET() {
    try {
        const stats = await getWakatimeStats();
        return jsonWithCache(stats, { sMaxAge: 900, staleWhileRevalidate: 1800 });
    } catch (error) {
        console.error('Error fetching Wakatime data:', error);
        return jsonError('Failed to fetch Wakatime data');
    }
}
