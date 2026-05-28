import { NextResponse } from 'next/server';
import { getWPPostById } from '@/lib/wordpress';

export async function GET() {
    const article = await getWPPostById(19);
    return NextResponse.json({ article });
}
