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
        <div
            className={`w-72 bg-gray-700 flex flex-col rounded-lg cursor-pointer ${
                track.isSelected ? 'border-2 border-green-500' : ''
            }`}
            id={uri}
            onClick={handleCardClick}
        >
            <img
                src={album.images[0].url}
                className="m-2 w-full h-48 object-contain rounded-t-lg"
                alt={`Album art for ${name}`}
            />
            <div className="flex flex-col justify-center items-center w-full p-4">
                <h3 className="text-slate-50 text-base text-center">{name}</h3>
                <h5 className="text-gray-400 text-sm text-center">{artists[0].name}</h5>
                <a
                    className="text-slate-50 text-sm mt-4 flex items-center justify-center"
                    href={external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Open in <img className="w-10 ml-1" src="/SpotifyLogo.png" alt="Spotify logo" />
                </a>
            </div>
        </div>
    );

    // return (
    //     <div className={`w-72 bg-gray-700 flex rounded-lg cursor-pointer ${
    //         track.isSelected ? 'border-2 border-green-500' : ''
    //     }`} id={uri} onClick={handleCardClick} >
    //         <img src={album.images[0].url} className="m-2 w-36 h-36"/>
    //         <div className="flex flex-col justify-center items-center w-full">
    //             <h3 className=" text-slate-50 text-base text-center">{name}</h3>
    //             <h5 className=" text-gray-400 text-sm">{artists[0].name}</h5>
    //             <a className='text-slate-50 text-sm mt-8' href={external_urls.spotify}>
    //                         Open in <img className="w-1/4" src="/SpotifyLogo.png"/>
    //             </a>
    //         </div>
    //     </div>
    // )

}