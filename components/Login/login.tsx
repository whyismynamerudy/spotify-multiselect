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
            <div className="h-1/3 mb-4 flex flex-col items-center justify-center">
                <p className="text-white">Welcome to <span className='text-xl mr-1'>MultiSelect</span>: a feature that <span className="text-green-500"> Spotify</span> should have implemented already.</p>
                <a href='\api\login' className='block mt-4'>
                    <p className="text-white bg-slate-800 py-2 px-4 rounded-lg font-semibold hover:bg-green-500 transition duration-500">
                        Log in to Spotify
                    </p>
                </a>
            </div>
            <div className="h-2/3 flex justify-center items-center">
                <iframe 
                    width="853" 
                    height="480" 
                    src="https://www.youtube.com/embed/F0MGNfFL7uE" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen 
                />
            </div>
        </main>
    )
}