'use client'

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation'

export default function ProfileComp() {
    // need to include middleware here to check for auth cookie

    const [ token, setToken ] = useState<string | null>(null)

    useEffect(()=>{

        setToken(localStorage.getItem('access_token'))

        if (!token) {
            redirect('/')
        }
    }, [])

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <p className="text-slate-50">
                Welcome, ${token}
            </p>
        </main>
    )
}