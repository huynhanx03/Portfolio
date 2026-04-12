import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
    try {
        const configPath = path.join(process.cwd(), 'data', 'competitive.json');
        const configData = await fs.readFile(configPath, 'utf-8');
        const config = JSON.parse(configData);
        const { username } = config.platforms.github;

        const response = await fetch(
            `https://github-contributions-api.deno.dev/${username}.json`,
            { next: { revalidate: 3600 } }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch GitHub contributions');
        }

        const data = await response.json();

        return NextResponse.json({
            username,
            contributions: data.contributions,
            totalContributions: data.totalContributions,
        });
    } catch (error) {
        console.error('GitHub API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch GitHub stats' },
            { status: 500 }
        );
    }
}
