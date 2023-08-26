import PlaylistCard from './playlistCard';
import { Playlist } from '@/utils/types';
import Link from 'next/link'
import querystring from 'querystring'

interface PlaylistsProps {
    token: string
    items: Playlist[];
    user_id: string
}

export default function Playlists({ items, token, user_id }: PlaylistsProps) {

    const getHref = (id: string) => {
      const params = querystring.stringify({
        id: id,
        token: token,
        user_id: user_id
      })
      return (`https://multiselect-tool.vercel.app/playlist?${params}`);
    }

    return (
        <div className="grid grid-cols-2 gap-4 m-auto max-h-full">
          {items.map((playlist) => (
            <Link key={playlist.id} href={getHref(playlist.id)}><PlaylistCard key={playlist.id} {...playlist} /></Link>
          ))}
        </div>
      );
}