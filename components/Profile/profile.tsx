'use client'

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation'

interface ProfileProps {
    token: string; // Add the url prop
}

export default function ProfileComp({ token }: ProfileProps) {
    // need to include middleware here to check for auth cookie

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