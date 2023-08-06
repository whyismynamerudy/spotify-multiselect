'use client'

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function Profile() {
    // need to include middleware here to check for auth cookie

    const [auth, setAuth] = useState<string | null>(null);

    useEffect(() => {
        const type = localStorage.getItem('token_type') || null;
        const token = localStorage.getItem('access_token') || null;
        const authFromCookie = `${type} ${token}`;
        setAuth(authFromCookie);
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <p className="text-slate-50">
                {auth || "nothing to see here"}
            </p>
        </main>
    )
}