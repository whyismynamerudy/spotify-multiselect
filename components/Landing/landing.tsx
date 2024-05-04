'use client'

import { useEffect } from 'react';
import { useAppContext } from "@/components/ContextAPI/provider"
import Login from '../Login/login';
import ProfileComp from '../Profile/profile';
import axios from 'axios'

interface LandingProps {
    url: string; // Add the url prop
}

export default function Landing({ url }: LandingProps) {

    const { token, setToken, expire, setExpire, storedAt, setStoredAt, refresh, setRefresh } = useAppContext();

    const refresh_req = async (refresh_token: string) => {
        console.log("this bitch called")
        const newres = await axios.get(`https://multiselect-tool.vercel.app/api/refresh_token?refresh_token=${refresh_token}`)
        
        setToken(newres.data.access_token)
        setExpire(newres.data.expires_in)
        setStoredAt(new Date().getTime())
    }


    // missing case where its not in params (else branch) but also not in storage?
    useEffect(() => {
        const query = new URL(url);
        const access_token = query.searchParams.get('access_token') || null;
        const token_type = query.searchParams.get('token_type') || null;
        const expires_in = query.searchParams.get('expires_in') || null;
        const stored_at = query.searchParams.get('stored_at') || null;
        const refresh_token = query.searchParams.get('refresh_token') || null;

        if (access_token && refresh_token && expires_in && stored_at) {
            const auth = access_token;
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

            console.log("retriving from storage: freresh token ", storedRefresh)

            const currTime = new Date().getTime()
            if (currTime > (storedStoredAt + (storedExpiry*1000)) || storedRefresh == null) {
                // refresh token
                if (storedRefresh) {
                    refresh_req(storedRefresh)
                }
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
            { token ? <ProfileComp /> : <Login url={url}/> }
        </>
    )
}