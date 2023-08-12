'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import axios from 'axios'

export default function PlaylistPage() {

    const [playlistData, setPlaylistData] = useState<string | null>(null);

    const params = useSearchParams();
    const token = params.get('token');
    const playlist_id = params.get('id');

    const getPlaylistData = async () => {

        const fields = "next%2Citems%28track%28album%28external_urls%2Cimages%29%2Cartists%28name%29%2Cexternal_urls%2Cname%29%29"

        const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks?fields=${fields}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setPlaylistData(JSON.stringify(response.data))
    }

    useEffect(() => {

        console.log("in playlist route/page!!")

        if (!token || !playlist_id) {
            return
        }

        getPlaylistData();

    });

    return (
        <pre className="text-slate-50">
            {playlistData}
        </pre>
    )

}