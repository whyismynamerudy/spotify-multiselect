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
    const [res, setRes] = useState<object>({});

    useEffect(() => {
        const query = new URL(url);
        const access_token = query.searchParams.get('access_token') || null;
        const token_type = query.searchParams.get('token_type') || null;
        const expires_in = query.searchParams.get('expires_in') || null;
        const stored_at = query.searchParams.get('stored_at') || null;
        const refresh_token = query.searchParams.get('refresh_token') || null;

        const refresh_req = async () => {
            const newres = await axios.get(`https://spotify-multiselect.vercel.app/api/refresh_token?refresh_token=${refresh_token}`)
            console.log("refresh req called, returning ", newres);
            setRes(newres)
        }

        if (refresh_token) {
            refresh_req();
        }

        if (access_token) {
            const auth = `${token_type} ${access_token}`;
            localStorage.setItem('auth_token', auth);
            setToken(auth)
        } else {
            const storedToken = localStorage.getItem('auth_token');
            setToken(storedToken)
        }
    }, []);

    return (
        <>
            { token ? <ProfileComp token={token} setToken={setToken}/> : <Login url={url}/> }
            <p className="text-slate-50">{JSON.stringify(res)}</p>
        </>
    )
}