import { Playlist } from "@/utils/types";

interface PlaylistCardProps extends Playlist {
    onPlaylistClick: (id: string) => void;
  }

export default function PlaylistCard({ id, images, name, owner, onPlaylistClick }: PlaylistCardProps) {

    const handlePlaylistClick = () => {
        onPlaylistClick(id);
    };

    return (
        <div className="h-40 w-[24rem] bg-gray-700 flex cursor-pointer" id={id} onClick={handlePlaylistClick}>
            <img src={images[0]?.url} alt={name} className="m-2 w-36 h-36"/>
            <div className="flex flex-col justify-center items-center w-full">
                <h3 className=" text-slate-50 text-base">{name}</h3>
                <h5 className=" text-gray-400 text-sm">The Genius of : {owner.display_name}</h5>
            </div>
        </div>
    )
}