import { jsonError, jsonWithCache } from '@/lib/http';
import { getLeetCodeStats } from '@/lib/stats';

export const revalidate = 3600;

export async function GET() {
    try {
        const stats = await getLeetCodeStats();
        return jsonWithCache(stats, { sMaxAge: 3600, staleWhileRevalidate: 86400 });
    } catch (error) {
        console.error('LeetCode API error:', error);
        return jsonError('Failed to fetch LeetCode stats');
    }
}
