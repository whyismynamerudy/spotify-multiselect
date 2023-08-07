'use client'

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation'
import axios from 'axios';

interface ProfileProps {
    token: string; 
}

export default function ProfileComp({ token }: ProfileProps) {

    const [data, setData] = useState<string | null>(null);

    const handleLogOut = () => {
        localStorage.clear()
        redirect('/');
    }

    useEffect(()=>{
        if (!token) {
            redirect('/')
        }

        console.log("In profile, token is: ", token);

        const apiCall = async () => {
            const response = await axios.get('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: token,
                }
            })
            setData(JSON.stringify(response.data))
        }

        apiCall();
        
    }, [])

    return (
        <>
        <nav className="min-w-full absolute">
            <button className="text-slate-50 rounded-md bg-green-600" onClick={handleLogOut}>
                Log Out
            </button>
        </nav>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <p className="text-slate-50">
                {data}
            </p>
        </main>
        </>
    )
}