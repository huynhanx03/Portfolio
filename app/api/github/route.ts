import { jsonError, jsonWithCache } from '@/lib/http';
import { getGithubStats } from '@/lib/stats';

export const revalidate = 3600;

export async function GET() {
    try {
        const stats = await getGithubStats();
        return jsonWithCache(stats, { sMaxAge: 3600, staleWhileRevalidate: 86400 });
    } catch (error) {
        console.error('GitHub API error:', error);
        return jsonError('Failed to fetch GitHub stats');
    }
}
