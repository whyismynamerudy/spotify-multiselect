'use client'

import { useState, useEffect } from 'react';
import Login from '../Login/login';
import ProfileComp from '../Profile/profile';

interface LandingProps {
    url: string; // Add the url prop
}

export default function Landing({ url }: LandingProps) {

    const [ token, setToken ] = useState<string | null>(null)

    useEffect(() => {
        const query = new URL(url);
        const access_token = query.searchParams.get('access_token') || null;
        const token_type = query.searchParams.get('token_type') || null;
        const expires_in = query.searchParams.get('expires_in') || null;

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
        </>
    )
}