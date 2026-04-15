import { jsonError, jsonWithCache } from '@/lib/http';
import { getOtherPlatforms } from '@/lib/stats';

export const revalidate = 86400;

// Returns the list of static "other" platforms from competitive.json.
export async function GET() {
    try {
        const otherPlatforms = await getOtherPlatforms();
        return jsonWithCache(otherPlatforms, { sMaxAge: 86400, staleWhileRevalidate: 86400 });
    } catch (error) {
        console.error('Other platforms API error:', error);
        return jsonError('Failed to fetch other platforms');
    }
}
