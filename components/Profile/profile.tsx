'use client'

import { useContext } from 'react';
import { AuthContext } from '@/components/AuthContext';

export default function Profile() {
    // need to include middleware here to check for auth cookie
    const { token } = useContext(AuthContext);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <p className="text-slate-50">
                Welcome, ${token}
            </p>
        </main>
    )
}