'use client'

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation'
import UserDetails from './UserDetails/userdetails';
import axios from 'axios';
import { User } from '@/utils/types';

interface ProfileProps {
    token: string; 
    setToken: (token: string | null) => void;
}


export default function ProfileComp({ token, setToken }: ProfileProps) {

    const [user, setUser] = useState<User | null>(null);

    const handleLogOut = () => {
        localStorage.clear()
        console.log("cleared local storage");
        setToken(null);
    }

    useEffect(()=>{
        if (!token) {
            redirect('/')
        }

        const apiCall = async () => {
            const response = await axios.get('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: token,
                }
            })
            setUser(response.data)
        }

        apiCall();
        
    }, [])

    return (
        <div className="h-screen min-h-screen">
        <main className="grid grid-cols-3 gap-4 p-4 h-full">
            {/* First Column */}
            <div className="col-span-1 m-auto">
                {user && <UserDetails user={user}/>}
            </div>
            <div className="col-span-2 bg-green-500">
                <nav className="min-w-full flex flex-row-reverse">
                    <button className="text-slate-50 rounded-md bg-green-600 m-3 p-1" onClick={handleLogOut}>
                        Log Out
                    </button>
                </nav>
            </div>
        </main>
        </div>
    )
}