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
            fetch('/api/login')
                .then(response => {
                    if (response.ok) {
                        // Assuming you might want to handle something with the response
                        // For example, you might want to parse the response to check the state or other data
                        return response.json();
                    } else {
                        throw new Error('Failed to fetch');
                    }
                })
                .then(data => {
                    // Redirect to your desired URL after handling the response
                    redirect('https://multiselect-tool.vercel.app/');
                })
                .catch(error => {
                    console.error('Error fetching /api/login:', error);
                });
        } else {
            console.log("Came here but nothing in url so no redirect happened");
        }
    }, [url]);

    // useEffect(() => {
    //     const query = new URL(url);
    //     const access_token = query.searchParams.get('access_token') || null;

    //     if (access_token) {
    //         redirect('https://multiselect-tool.vercel.app/') // makes sure theres no url params
    //     } else {
    //         console.log("came here but nothing in url so no redirect happened");
    //     }
    // }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="h-1/3 mb-4 flex flex-col items-center justify-center">
                <p className="text-white">Welcome to <span className='text-xl mr-1'>MultiSelect</span>: a feature that <span className="text-green-500"> Spotify</span> should have implemented already.</p>
                <p className='text-white m-1'>All content in this application has been supplied and made available by Spotify</p>
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