import PlaylistCard from './playlistCard';
import { Playlist } from '@/utils/types';

interface PlaylistsProps {
    items: Playlist[];
}

export default function Playlists({ items }: PlaylistsProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
          {items.map((playlist) => (
            <PlaylistCard key={playlist.id} {...playlist} />
          ))}
        </div>
      );
}