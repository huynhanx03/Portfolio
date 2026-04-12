import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { CodeforcesStats, CompetitiveData } from '@/lib/types';

interface CodeforcesUserInfo {
    handle: string;
    rating?: number;
    maxRating?: number;
    rank?: string;
    maxRank?: string;
}

interface CodeforcesSubmission {
    verdict: string;
    problem: {
        contestId: number;
        index: string;
        name: string;
    };
}

export async function GET() {
    try {
        // Read competitive config
        const configPath = path.join(process.cwd(), 'data', 'competitive.json');
        const configData = await fs.readFile(configPath, 'utf-8');
        const config: CompetitiveData = JSON.parse(configData);
        const { username, profileUrl } = config.platforms.codeforces;

        // Fetch user info
        const userInfoRes = await fetch(
            `https://codeforces.com/api/user.info?handles=${username}`,
            { next: { revalidate: 3600 } }
        );

        if (!userInfoRes.ok) {
            throw new Error('Failed to fetch Codeforces user info');
        }

        const userInfoData = await userInfoRes.json();

        if (userInfoData.status !== 'OK') {
            throw new Error(userInfoData.comment || 'Codeforces API error');
        }

        const userInfo: CodeforcesUserInfo = userInfoData.result[0];

        // Fetch submissions to count solved problems
        const submissionsRes = await fetch(
            `https://codeforces.com/api/user.status?handle=${username}&from=1&count=10000`,
            { next: { revalidate: 3600 } }
        );

        let problemsSolved = 0;

        if (submissionsRes.ok) {
            const submissionsData = await submissionsRes.json();
            if (submissionsData.status === 'OK') {
                const solvedSet = new Set<string>();
                submissionsData.result.forEach((sub: CodeforcesSubmission) => {
                    if (sub.verdict === 'OK') {
                        solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
                    }
                });
                problemsSolved = solvedSet.size;
            }
        }

        const stats: CodeforcesStats = {
            platform: 'codeforces',
            username: userInfo.handle,
            rating: userInfo.rating || 0,
            maxRating: userInfo.maxRating || 0,
            rank: userInfo.rank || 'unrated',
            maxRank: userInfo.maxRank || 'unrated',
            problemsSolved,
            profileUrl,
        };

        return NextResponse.json(stats);
    } catch (error) {
        console.error('Codeforces API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Codeforces stats' },
            { status: 500 }
        );
    }
}
