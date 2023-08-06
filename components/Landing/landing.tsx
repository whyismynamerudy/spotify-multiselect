'use client'

import { useContext, useEffect } from 'react';
import { AuthContext } from '@/components/AuthContext';
import Login from '../Login/login';
import Profile from '../Profile/profile';

interface LandingProps {
    url: string | null; // Add the url prop
}

export default function Landing({ url }: LandingProps) {

    const { token, setToken } = useContext(AuthContext)

    useEffect(() => {
        const query = new URL(url || '');
        const access_token = query.searchParams.get('access_token') || null;
        const token_type = query.searchParams.get('token_type') || null;

        if (access_token) {
            const auth = `${token_type} ${access_token}`;
            setToken(auth)
        }
    }, []);

    return (
        <>
            { token ? <Profile /> : <Login /> }
        </>
    )
}