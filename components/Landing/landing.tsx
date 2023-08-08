'use client'

import { useState, useEffect } from 'react';
import Login from '../Login/login';
import ProfileComp from '../Profile/profile';
import axios from 'axios'

interface LandingProps {
    url: string; // Add the url prop
}

export default function Landing({ url }: LandingProps) {

    const [ token, setToken ] = useState<string | null>(null)
    const [ expire, setExpire ] = useState<number>(0)
    const [ storedAt, setStoredAt ] = useState<number>(0)
    const [ refresh, setRefresh ] = useState<string | null>(null)

    useEffect(() => {
        const query = new URL(url);
        const access_token = query.searchParams.get('access_token') || null;
        const token_type = query.searchParams.get('token_type') || null;
        const expires_in = query.searchParams.get('expires_in') || null;
        const stored_at = query.searchParams.get('stored_at') || null;
        const refresh_token = query.searchParams.get('refresh_token') || null;

        const refresh_req = async () => {
            const newres = await axios.get(`https://spotify-multiselect.vercel.app/api/refresh_token?refresh_token=${refresh_token}`)
            
            setToken(`${newres.data.token_type} ${newres.data.access_token}`)
            setExpire(newres.data.expires_in)
            setStoredAt(new Date().getTime())
        }

        if (access_token && refresh_token && expires_in && stored_at) {
            const auth = `${token_type} ${access_token}`;
            localStorage.setItem('auth_token', auth);
            localStorage.setItem('refresh_token', refresh_token);
            localStorage.setItem('expires_in', expires_in);
            localStorage.setItem('stored_at', stored_at);
            setToken(auth)
            setExpire(Number(expires_in))
            setStoredAt(Number(stored_at))
            setRefresh(refresh_token)
        } else {
            let storedToken = localStorage.getItem('auth_token');
            let storedRefresh = localStorage.getItem('refresh_token');
            let storedExpiry = Number(localStorage.getItem('expires_in'));
            let storedStoredAt = Number(localStorage.getItem('stored_at'));

            const currTime = new Date().getTime()
            if (currTime > (storedStoredAt + (storedExpiry*1000))) {
                // refresh token
                refresh_req()
            } else {
                setToken(storedToken)
                setExpire(storedExpiry)
                setStoredAt(storedStoredAt)
            }
            setRefresh(storedRefresh)
        }
    }, []);

    return (
        <>
            { token ? <ProfileComp token={token} setToken={setToken}/> : <Login url={url}/> }
        </>
    )
}