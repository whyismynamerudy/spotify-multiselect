import TrackCard from "./trackCard";
import { Track } from "@/utils/types";

interface TracksProps {
    items: Track[]
}

export default function Tracks({ items }: TracksProps) {

    return(
        <div className="grid grid-cols-4 gap-2 m-auto max-h-full">
          {items.map((item) => (
            <TrackCard key={item.track.id} track={item} />
          ))}
        </div>
    )
}