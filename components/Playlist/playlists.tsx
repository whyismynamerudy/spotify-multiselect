'use client'

import PlaylistCard from './playlistCard';
import { Playlist } from '@/utils/types';
import Link from 'next/link'
import querystring from 'querystring'

interface PlaylistsProps {
    token: string
    items: Playlist[];
    onPlaylistClick: (id: string) => void;
}

export default function Playlists({ items, onPlaylistClick, token }: PlaylistsProps) {

    const getHref = (id: string) => {
      const params = querystring.stringify({
        id: id,
        token: token
      })
      return (`https://spotify-multiselect.vercel.app/playlist?${params}`);
    }

    return (
        <div className="grid grid-cols-2 gap-4 m-auto max-h-full">
          {items.map((playlist) => (
            <Link href={getHref(playlist.id)}><PlaylistCard key={playlist.id} {...playlist} onPlaylistClick={onPlaylistClick} /></Link>
          ))}
        </div>
      );
}