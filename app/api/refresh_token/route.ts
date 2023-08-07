import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const url = new URL(request.url)
    const refresh_token = url.searchParams.get('refresh_token');

    // to do
}