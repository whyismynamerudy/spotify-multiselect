'use client'

import { useEffect } from 'react';
import { useAppContext } from "@/components/ContextAPI/provider"
import { redirect } from 'next/navigation'
import UserDetails from './UserDetails/userdetails';
import axios from 'axios';

// interface ProfileProps {
//     token: string; 
//     setToken: (token: string | null) => void;
// }


export default function ProfileComp() {

    const { user, setUser, token, setToken, test } = useAppContext();

    const handleLogOut = () => {
        localStorage.clear()
        console.log("cleared local storage");
        setToken(null);
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

    useEffect(()=>{
        console.log('test is: ', test)
        console.log('token is: ', token)
        if (!token) {
            console.log('token not detected')
            redirect('/')
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