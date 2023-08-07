'use client'

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation'
import axios from 'axios';

interface ProfileProps {
    token: string; 
}

export default function ProfileComp({ token }: ProfileProps) {

    const [data, setData] = useState<string | null>(null);

    useEffect(()=>{
        if (!token) {
            redirect('/')
        }

        const apiCall = async () => {
            const response = await axios.get('https://spotify-multiselect.vercel.app/api/me', {
                headers: {
                    'token': token
                }
            })
            setData(JSON.stringify(response.data))
        }

        apiCall();
        
    }, [])

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <p className="text-slate-50">
                {data}
            </p>
        </main>
    )
}