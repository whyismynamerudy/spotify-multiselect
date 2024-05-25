// 'use client'

// import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'
const querystring = require('querystring');
import axios from 'axios';

interface LoginProps {
    url: string; // Add the url prop
}

const generateRandomString = (length: number) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export default function Login({ url }: LoginProps) {

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.get('/api/login');
      if (response.status === 200 && response.headers.location) {
        // The server should redirect the user to the Spotify authorization page
        window.location.href = response.headers.location;
      } else {
        console.error("Failed to initiate Spotify authorization");
      }
    } catch (error) {
      console.error("An error occurred while initiating Spotify authorization", error);
    }
  };

  useEffect(() => {
    const query = new URL(url);
    const access_token = query.searchParams.get('access_token') || null;

    if (access_token) {
      router.push('https://multiselect-tool.vercel.app/'); // ensures there are no URL params
    } else {
      console.log("Came here but nothing in URL so no redirect happened");
    }
  }, [url, router]);

    // const router = useRouter();

    // const handleLogin = () => {
    //     console.log("Re-routing to Spotify for Authorization");

    //     axios.get('/api/login');

        // const state = generateRandomString(16);
        // const scope = `
        // user-read-private 
        // user-read-email
        // user-library-read 
        // playlist-read-private 
        // playlist-read-collaborative 
        // playlist-modify-private 
        // playlist-modify-public
        // `;

        // //to do: alter /api/login to return the query params instead

        // const queryParams = querystring.stringify({
        //     client_id: process.env.CLIENT_ID,
        //     response_type: 'code',
        //     redirect_uri: process.env.REDIRECT_URI,
        //     state: state,
        //     scope: scope,
        // });

        // router.push(`https://accounts.spotify.com/authorize?${queryParams}`);
    // };


    // useEffect(() => {
    //     const query = new URL(url);
    //     const access_token = query.searchParams.get('access_token') || null;

    //     if (access_token) {
    //         const state = generateRandomString(16);
    //         const scope = `
    //             user-read-private 
    //             user-read-email
    //             user-library-read 
    //             playlist-read-private 
    //             playlist-read-collaborative 
    //             playlist-modify-private 
    //             playlist-modify-public
    //         `;

    //         const queryParams = querystring.stringify({
    //             client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
    //             response_type: 'code',
    //             redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
    //             state: state,
    //             scope: scope,
    //         });

    //         redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
    //     } else {
    //         console.log("Came here but nothing in url so no redirect happened");
    //     }
    // }, [url]);

    // useEffect(() => {
    //     const query = new URL(url);
    //     const access_token = query.searchParams.get('access_token') || null;

    //     if (access_token) {
    //         router.push('https://multiselect-tool.vercel.app/') // makes sure theres no url params
    //     } else {
    //         console.log("came here but nothing in url so no redirect happened");
    //     }
    // }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="h-1/3 mb-4 flex flex-col items-center justify-center">
                <p className="text-white">Welcome to <span className='text-xl mr-1'>MultiSelect</span>: a feature that <span className="text-green-500"> Spotify</span> should have implemented already.</p>
                <p className='text-white m-1'>All content in this application has been supplied and made available by Spotify</p>
                <button onClick={handleLogin} className='block mt-4'>
                    <p className="text-white bg-slate-800 py-2 px-4 rounded-lg font-semibold hover:bg-green-500 transition duration-500">
                        Log in to Spotify
                    </p>
                </button>
            </div>
            <div className="h-2/3 flex justify-center items-center">
                <iframe 
                    width="853" 
                    height="480" 
                    //src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" 
                    src="https://www.loom.com/embed/abd0b069254f487fbca587d4b69191e1?sid=3176d4de-5fb3-4635-a3e0-3948d66c9539"
                    title="Loom Video Player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen 
                />
            </div>
        </main>
    )
}