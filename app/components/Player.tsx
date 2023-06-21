'use client'

import React from 'react';
import usePlayer from "@/hooks/usePlayer";
import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import PlayerContent from "@/app/components/PlayerContent";

const Player = () => {

    const player = usePlayer();
    const {song} = useGetSongById(player.activeId)

    const songUrl = useLoadSongUrl(song!);

    if(!song || !songUrl || !player.activeId) {
        return null
    };

    return (
        <div className='
        fixed
        bottom-0
        bg-black
        w-full
        py-2
        h-[80px]
        px-4
        bg-opacity-75
        backdrop-blur-md
        md:bg-gradient-to-t
        md:from-gray-950
        ' >
            <PlayerContent song={song} songUrl={songUrl} key={songUrl} />
        </div>
    );
};

export default Player;