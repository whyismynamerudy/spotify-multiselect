import { Track } from "@/utils/types";

interface TrackCardProps {
    track: Track
}

export default function TrackCard({ track }: TrackCardProps) {

    const { album, artists, external_urls, id, name } = track.track;

    return (
        <div className="h-52 w-72 bg-gray-700 flex cursor-pointer" id={id} >
            <img src={album.images[0].url} className="m-2 w-24"/>
            <div className="flex flex-col justify-center items-center w-full">
                <h3 className=" text-slate-50 text-base">{name}</h3>
                <h5 className=" text-gray-400 text-sm">{artists[0].name}</h5>
            </div>
        </div>
    )

}