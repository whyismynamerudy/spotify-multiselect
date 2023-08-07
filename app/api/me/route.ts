import { type NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {

    const url = new URL(request.url);
    const token = url.searchParams.get('token')

    const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: token
        }
    })

    return NextResponse.json(response.data)

}