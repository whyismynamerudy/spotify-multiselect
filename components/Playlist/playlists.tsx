import PlaylistCard from './playlistCard';
import { Playlist } from '@/utils/types';

interface PlaylistsProps {
    items: Playlist[];
    onPlaylistClick: (id: string) => void;
}

export default function Playlists({ items, onPlaylistClick }: PlaylistsProps) {
    return (
        <div className="grid grid-cols-2 gap-4 m-auto max-h-full">
          {items.map((playlist) => (
            <PlaylistCard key={playlist.id} {...playlist} onPlaylistClick={onPlaylistClick} />
          ))}
        </div>
      );
}