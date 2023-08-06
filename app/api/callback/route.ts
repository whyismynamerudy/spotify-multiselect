import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import Cookies from 'js-cookie';
const querystring = require('querystring');

export async function GET(request: NextRequest) {

    // console.log('Request Object:', request);
    // console.log('Headers:', request.headers);

    const url = new URL(request.url)
    const code = url.searchParams.get('code') || null;

    console.log(`
        Returning from Spotify:
            url: ${url},
            code: ${code}
    `)

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

    console.log(`
        Credentials: ${credentials},
        RequestBody: ${requestBody},
        Headers: ${headers}
    `)

    // axios.post('https://accounts.spotify.com/api/token', {
    //     grant_type: 'authorization_code',
    //     code: url_code,
    //     redirect_uri: process.env.REDIRECT_URI
    //     }, {
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //             Authorization: `Basic ${new (Buffer as any).from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
    //         }
    //     }
    // )
    // axios({
    //     method: 'post',
    //     url: 'https://accounts.spotify.com/api/token',
    //     data: querystring.stringify({
    //         grant_type: 'authorization_code',
    //         code: code,
    //         redirect_uri: process.env.REDIRECT_URI
    //     }),
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         Authorization: `Basic ${new (Buffer as any).from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
    //     },
    // })
    // axios
    // .post('https://accounts.spotify.com/api/token', requestBody, { headers })
    // .then((response: any) => {
    //     console.log("In Response Section of callback, gotten response: ", response.data)
        // if (response.status === 200) {

        //     const { access_token, token_type } = response.data;
        //     const auth = `${token_type} ${access_token}`;
        //     Cookies.set('Authorization', auth);

        //     return NextResponse.redirect('/profile');

        // } else {
        //     return NextResponse.json({ response });
        // }
    // })
    // .catch((err: any) => {
    //     console.log(`There has been an error in the callback, ${err}`)
    //     return NextResponse.json({ err });
    // })
}