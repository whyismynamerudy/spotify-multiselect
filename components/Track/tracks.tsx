import TrackCard from "./trackCard";
import { Track } from "@/utils/types";

interface TracksProps {
    items: Track[]
    onToggleSelect: (track: Track) => void;
}

export default function Tracks({ items, onToggleSelect }: TracksProps) {

    return(
        <div className="grid grid-cols-4 gap-4 m-auto max-h-full">
          {items.map((item) => (
            <TrackCard key={item.track.id} track={item} onToggleSelect={onToggleSelect}/>
          ))}
        </div>
    )
}