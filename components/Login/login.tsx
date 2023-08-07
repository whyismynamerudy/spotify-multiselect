'use client'

import { redirect } from 'next/navigation'
import { useEffect } from 'react'

interface LoginProps {
    url: string; // Add the url prop
}

export default function Login({ url }: LoginProps) {

    useEffect(() => {
        const query = new URL(url);
        const access_token = query.searchParams.get('access_token') || null;

        if (access_token) {
            redirect('https://spotify-multiselect.vercel.app/') // makes sure theres no url params
        }
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <p className="text-white">this is a feature that <span className="text-green-500"> Spotify</span> should have implemented already</p>
            <a href='\api\login'>
                <p className="text-white">
                    Log in to Spotify
                </p>
            </a>
        </main>
    )
}