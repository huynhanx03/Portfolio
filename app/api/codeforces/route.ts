import { jsonError, jsonWithCache } from '@/lib/http';
import { getCodeforcesStats } from '@/lib/stats';

export const revalidate = 3600;

export async function GET() {
    try {
        const stats = await getCodeforcesStats();
        return jsonWithCache(stats, { sMaxAge: 3600, staleWhileRevalidate: 86400 });
    } catch (error) {
        console.error('Codeforces API error:', error);
        return jsonError('Failed to fetch Codeforces stats');
    }
}
