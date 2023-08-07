'use client'

import { useEffect } from 'react';
import { redirect } from 'next/navigation'

export default function ProfileComp() {
    // need to include middleware here to check for auth cookie
    const token = localStorage.getItem('auth_token')

    useEffect(()=>{
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