'use client'

import { useEffect, useState } from 'react';
import { useAppContext } from "@/components/ContextAPI/provider"
import { redirect } from 'next/navigation'
import UserDetails from './UserDetails/userdetails';
import Playlists from '../Playlist/playlists';
import { Playlist } from '@/utils/types';
import axios from 'axios';

export default function ProfileComp() {

    const { user, setUser, token, setToken, test } = useAppContext();
    const [ playlistData, setPlaylistData ] = useState<Playlist[] | null>(null)

    const handleLogOut = () => {
        localStorage.clear()
        console.log("cleared local storage");
        setToken(null);
        redirect('/')
    }

    const getProfileData = async () => {
        const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: token,
            }
        })
        setUser(response.data)
    }

    const getPlaylistData = async () => {
        if (!user) {
            return
        }

        const response = await axios.get(`https://api.spotify.com/v1/users/${user.id}/playlists?limit=50&offset=0`)
        setPlaylistData(response.data.items);
    }

    useEffect(()=>{
        console.log('test is: ', test)
        console.log('token is: ', token)
        if (!token) {
            console.log('token not detected')
            redirect('/')
        }

        getProfileData();
        getPlaylistData();
        
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
                <h3 className="text-slate-50">Playlists</h3>
                {playlistData && <Playlists items={playlistData} />}
            </div>
        </main>
        </div>
    )
}