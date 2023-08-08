import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
const querystring = require('querystring');

export async function GET(request: NextRequest) {

    // console.log('Request Object:', request);
    // console.log('Headers:', request.headers);

    const url = new URL(request.url)
    const code = url.searchParams.get('code') || null;

    // console.log(`
    //     Returning from Spotify:
    //         url: ${url},
    //         code: ${code}
    // `)

    const credentials = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64');

    const requestBody = querystring.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.REDIRECT_URI
    });

    type HeadersType = {
        'Content-Type': string;
        Authorization: string;
    };
      
    const headers: HeadersType = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${credentials}`,
    };

    // console.log(`
    //     Credentials: ${credentials},
    //     RequestBody: ${requestBody},
    //     Headers: ${JSON.stringify(headers)}
    // `)

    const response = await axios.post('https://accounts.spotify.com/api/token', requestBody, { headers });

    if (response.status === 200) {
        const { access_token, token_type, expires_in, refresh_token } = response.data;
        const currTime = new Date().getTime();

        const qstring = querystring.stringify({
            "access_token": access_token,
            "token_type": token_type,
            "expires_in": expires_in,
            "stored_at": currTime,
            "refresh_token": refresh_token
        });

        return NextResponse.redirect(new URL(`/?${qstring}`, request.url));
    } else {
        return NextResponse.redirect(new URL(`/?${querystring.stringify({ error:'invalid_token' })}`));
    }
}