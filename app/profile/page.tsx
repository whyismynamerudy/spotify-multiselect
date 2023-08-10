'use client'

import { useAppContext } from "@/components/ContextAPI/provider"

export default function Profile() {

    const { test, expire, storedAt } = useAppContext();

    return (
        <div className="text-slate-50">
            <p>Welcome to the profile route, this is temp atm.</p>
            <p>{test}</p>
            <p>Current Expire: {expire} and Current StoredAt: {storedAt}</p>
        </div>
    )
}