import { Track } from "@/utils/types";

interface TrackCardProps {
    track: Track
    onToggleSelect: (track: Track) => void;
}

export default function TrackCard({ track, onToggleSelect }: TrackCardProps) {

    const { album, artists, external_urls, uri, name } = track.track;

    const handleCardClick = () => {
        onToggleSelect(track);
      };

    return (
        <div className={`w-72 bg-gray-700 flex cursor-pointer ${
            track.isSelected ? 'border-2 border-blue-500' : ''
        }`} id={uri} onClick={handleCardClick} >
            <img src={album.images[0].url} className="m-2 w-24 h-24"/>
            <div className="flex flex-col justify-center items-center w-full">
                <h3 className=" text-slate-50 text-base">{name}</h3>
                <h5 className=" text-gray-400 text-sm">{artists[0].name}</h5>
            </div>
        </div>
    )

}