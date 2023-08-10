'use client'

import ProfileComp from "@/components/Profile/profile";
import { useAppContext } from "@/components/ContextAPI/provider"
import { useEffect } from "react";

export default function Profile() {

    const { token, setToken, expire, setExpire, storedAt, setStoredAt, refresh, setRefresh, test } = useAppContext();

    useEffect(() => {
        console.log("on profile page, test is ", test)
    }, []);

    return (
        <ProfileComp />
    )
}