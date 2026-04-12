import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { CompetitiveData } from '@/lib/types';

// Returns the list of static "other" platforms from competitive.json.
export async function GET() {
    try {
        const configPath = path.join(process.cwd(), 'data', 'competitive.json');
        const configData = await fs.readFile(configPath, 'utf-8');
        const config: CompetitiveData = JSON.parse(configData);

        return NextResponse.json(config.otherPlatforms);
    } catch (error) {
        console.error('Other platforms API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch other platforms' },
            { status: 500 }
        );
    }
}
