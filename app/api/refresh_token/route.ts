import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import querystring from 'querystring';

export async function GET(request: NextRequest) {
    const url = new URL(request.url)
    const refresh_token = url.searchParams.get('refresh_token');

    const credentials = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64');

    const requestBody = querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: refresh_token
    });

    type HeadersType = {
        'Content-Type': string;
        Authorization: string;
    };
      
    const headers: HeadersType = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${credentials}`,
    };

    // to do

    const response = await axios.post('https://accounts.spotify.com/api/token', requestBody, { headers })

    console.log("in refresh_token route, returning: ", response.data)

    return NextResponse.json(response.data)

}