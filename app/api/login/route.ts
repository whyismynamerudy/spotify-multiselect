import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    console.log("logging into spotify");
    return NextResponse.redirect(`https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}`);
}