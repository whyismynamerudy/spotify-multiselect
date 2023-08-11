import { Playlist } from "@/utils/types";

export default function PlaylistCard({ id, images, name, owner }: Playlist) {
    return (
        <div className=" h-32 w-0 bg-gray-700 flex" id={id}>
            <img src={images[0]?.url} alt={name} className="m-2 w-28 h-28"/>
            <div className="flex justify-center items-center">
                <h3 className=" text-slate-50">{name}</h3>
                <h5 className=" text-slate-50">The Genius of : {owner.display_name}</h5>
            </div>
        </div>
    )
}