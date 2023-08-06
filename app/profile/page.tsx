'use client'

import Cookies from 'js-cookie';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/components/AuthContext';

export default function Profile() {
    // need to include middleware here to check for auth cookie

    const [auth, setAuth] = useState<string | null>(null);

    useEffect(() => {
        const { token } = useContext(AuthContext);
        setAuth(token);
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <p className="text-slate-50">
                {auth || "nothing to see here"}
            </p>
        </main>
    )
}