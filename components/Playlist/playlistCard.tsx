import { Playlist } from "@/utils/types";


export default function PlaylistCard({ id, images, name, owner, external_urls }: Playlist) {

    const handleSpotifyLogoClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.stopPropagation(); // Prevent the click event from propagating to the Link component
    }

    return (
        <div className="h-40 w-[24rem] bg-gray-700 flex cursor-pointer rounded-lg" id={id}>
            <img src={images[0]?.url} alt={name} className="m-2 w-36 h-36"/>
            <div className="flex flex-col justify-center items-center w-full">
                <h3 className=" text-slate-50 text-base">{name}</h3>
                <h5 className=" text-gray-400 text-sm">The Genius of : {owner.display_name}</h5>
                <div className="flex items-center justify-center mt-4">
                    <a href={external_urls.spotify} 
                       target="_blank" 
                       className="flex items-center justify-center text-slate-50" 
                       onClick={handleSpotifyLogoClick}
                    >
                     Open in <img className="w-1/2" src="/SpotifyLogo.png"/>
                    </a>
                </div>
            </div>
        </div>
    )
}