import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { LeetCodeStats, CompetitiveData } from '@/lib/types';

const LEETCODE_GRAPHQL_URL = 'https://leetcode.com/graphql';

const USER_PROFILE_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
    userContestRanking(username: $username) {
      rating
      topPercentage
    }
    allQuestionsCount {
      difficulty
      count
    }
  }
`;

interface LeetCodeResponse {
    data: {
        matchedUser: {
            username: string;
            submitStatsGlobal: {
                acSubmissionNum: Array<{
                    difficulty: string;
                    count: number;
                }>;
            };
        };
        userContestRanking: {
            rating: number;
            topPercentage: number;
        } | null;
        allQuestionsCount: Array<{
            difficulty: string;
            count: number;
        }>;
    };
}

export async function GET() {
    try {
        // Read competitive config
        const configPath = path.join(process.cwd(), 'data', 'competitive.json');
        const configData = await fs.readFile(configPath, 'utf-8');
        const config: CompetitiveData = JSON.parse(configData);
        const { username, profileUrl } = config.platforms.leetcode;

        // Fetch from LeetCode GraphQL API
        const response = await fetch(LEETCODE_GRAPHQL_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://leetcode.com',
            },
            body: JSON.stringify({
                query: USER_PROFILE_QUERY,
                variables: { username },
            }),
            next: { revalidate: 3600 },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch LeetCode data');
        }

        const result: LeetCodeResponse = await response.json();

        if (!result.data?.matchedUser) {
            throw new Error('LeetCode user not found');
        }

        const { matchedUser, allQuestionsCount } = result.data;
        const acStats = matchedUser.submitStatsGlobal.acSubmissionNum;

        // Find counts by difficulty
        const findCount = (difficulty: string) =>
            acStats.find((s) => s.difficulty === difficulty)?.count || 0;
        const findTotal = (difficulty: string) =>
            allQuestionsCount.find((q) => q.difficulty === difficulty)?.count || 0;

        const stats: LeetCodeStats = {
            platform: 'leetcode',
            username: matchedUser.username,
            rating: Math.round(result.data.userContestRanking?.rating || 0),
            topPercentage: result.data.userContestRanking?.topPercentage,
            problemsSolved: findCount('All'),
            totalProblems: findTotal('All'),
            easySolved: findCount('Easy'),
            mediumSolved: findCount('Medium'),
            hardSolved: findCount('Hard'),
            profileUrl,
        };

        return NextResponse.json(stats);
    } catch (error) {
        console.error('LeetCode API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch LeetCode stats' },
            { status: 500 }
        );
    }
}
