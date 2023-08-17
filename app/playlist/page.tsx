'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { Track, PlaylistInfo, PlaylistData } from '@/utils/types';
import { GoArrowLeft } from "react-icons/go";
import Tracks from '@/components/Track/tracks';
import axios from 'axios'
import Link from 'next/link';

export default function PlaylistPage() {

    //const [playlistData, setPlaylistData] = useState<PlaylistData | null>(null);
    const [playlistInfo, setPlaylistInfo] = useState<PlaylistInfo | null>(null);
    const [tracks, setTracks] = useState<Track[] | null>(null);
    const [display, setDisplay] = useState<boolean>(false)
    const [selectedCards, setSelectedCards] = useState<string[]>([]);

    const params = useSearchParams();
    const token = params.get('token');
    const playlist_id = params.get('id');

    const addTracks = (newTracks: Track[]) => {
        const tracksWithSelection = newTracks.map((track) => ({
            ...track,
            isSelected: false,
          }));
        
          setTracks((prevTracks) =>
            prevTracks ? [...prevTracks, ...tracksWithSelection] : tracksWithSelection
          );
    };

    const toggleTrackSelect = (selectedTrack: Track) => {
        setTracks((prevTracks) =>
          prevTracks
            ? prevTracks.map((track) =>
                track === selectedTrack
                  ? { ...track, isSelected: !track.isSelected }
                  : track
              )
            : []
        );
    
        setSelectedCards((prevSelectedCards) =>
          selectedTrack.isSelected
            ? prevSelectedCards.filter((id) => id !== selectedTrack.track.id)
            : [...prevSelectedCards, selectedTrack.track.id]
        );
      };

    const getPlaylistTracks = async () => {

        //const fields = "next%2Citems%28track%28album%28external_urls%2Cimages%29%2Cartists%28name%29%2Cexternal_urls%2Cname%29%29"
        const fields = "next%2Citems%28track%28album%28external_urls%2Cimages%29%2Cartists%28name%29%2Cexternal_urls%2Cid%2Cname%29%29"

        let response = await axios.get(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks?fields=${fields}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log("next is: ", response.data.next);
        addTracks(response.data.items)

        while (response.data.next) {
            response = await axios.get(response.data.next, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("adding following tracks to tracks state: ", response.data.items)
            addTracks(response.data.items)
        }

        setDisplay(true);
    }

    const getPlaylistInfo = async () => {
        const fields = "external_urls%28spotify%29%2Cimages%2Cname";

        const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlist_id}?fields=${fields}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setPlaylistInfo(response.data)
    }

    useEffect(() => {

        setDisplay(false)

        if (!token || !playlist_id) {
            return
        }

        getPlaylistInfo()
        getPlaylistTracks();

    }, []);

    return (
        <div>
            <nav className="w-full flex m-2 mt-4">
                <Link href="https://spotify-multiselect.vercel.app/">
                    <p className='text-slate-50 flex ml-6 gap-2'><GoArrowLeft className="scale-150 m-1"/> Back</p>
                </Link>
            </nav>
            <div className="w-full flex">
                {/* playlist info section */}
                <div className="w-1/2 flex">
                    {/* playlist img and name */}
                    <img src={playlistInfo?.images[0]?.url} alt={playlistInfo?.name} className="m-8 w-52 h-52" />
                    <div>
                        <h1 className="text-slate-50 text-2xl mt-8">{playlistInfo?.name}</h1>
                    </div>
                </div>
                <div className="w-1/2">
                    {/* button to add songs to other playlist */}
                </div>
            </div>
            <div className="text-slate-50 m-8 relative">
                {/* tracks section */}
                <h2 className="text-slate-50 text-xl mb-4">Songs</h2>
                <div className="overflow-scroll absolute w-full">
                    {display && tracks && <Tracks items={tracks} onToggleSelect={toggleTrackSelect} />}
                </div>
            </div>
            <h2 className='text-slate-50'>Selected Cards:</h2>
            <ul className='text-slate-50'>
                {selectedCards.map((id) => (
                <li className='text-slate-50' key={id}>{id}</li>
                ))}
            </ul>
        </div>
    )

}