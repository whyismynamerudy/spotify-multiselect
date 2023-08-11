import { Playlist } from "@/utils/types";

export default function PlaylistCard({ description, id, images, name, owner }: Playlist) {
    return (
        <div className=" h-32 w-40 bg-gray-700 flex overflow-scroll" id={id}>
            <img src={images[0]?.url} alt={name} className="m-2 w-28 h-28"/>
            <div className="flex items-start">
                <h3 className=" text-slate-50">{name}</h3>
                <h5 className=" text-slate-50">{owner[0]?.display_name}</h5>
            </div>
        </div>
    )
}