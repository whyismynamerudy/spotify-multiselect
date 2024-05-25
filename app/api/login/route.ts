import { type NextRequest, NextResponse } from 'next/server';
const querystring = require('querystring');
import cors from 'cors';

const corsMiddleware = cors({
    origin: 'https://multiselect-tool.vercel.app',
    methods: ['GET'], // Allow only GET requests for this API route
  });

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length: number) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};


export async function GET(request: NextRequest, response: NextResponse) {

    // await corsMiddleware(request, response);

    response.headers.set('Access-Control-Allow-Origin', 'https://multiselect-tool.vercel.app');
    response.headers.set('Access-Control-Allow-Methods', 'GET');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    console.log("Re-routing to Spotify for Authorization");

    const state = generateRandomString(16);
    const scope = `
    user-read-private 
    user-read-email
    user-library-read 
    playlist-read-private 
    playlist-read-collaborative 
    playlist-modify-private 
    playlist-modify-public
    `;

    const queryParams = querystring.stringify({
        client_id: process.env.CLIENT_ID,
        response_type: 'code',
        redirect_uri: process.env.REDIRECT_URI,
        state: state,
        scope: scope,
    });

    return NextResponse.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
}