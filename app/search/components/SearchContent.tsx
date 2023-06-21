'use client'

import React from 'react';
import {Song} from "@/types";
import {BiSad} from "react-icons/bi";
import MediaItem from "@/app/components/MediaItem";
import LikedButton from "@/app/components/LikedButton";
import useOnPlay from "@/hooks/useOnPlay";

interface SearchContentProps {
    songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({songs}) => {

    const onPlay = useOnPlay(songs)

    if (songs.length === 0) {
        return (
            <div
                className='
            flex
            items-center
            gap-y-2
            w-full
            px-6
            gap-x-3
            text-neutral-400
            '
            >
                No Songs Found <BiSad size={20}/>
            </div>
        )
    }

    return (
        <div
            className='
        flex
        flex-col
        gap-y-2
        w-full
        px-6
        '
        >
            {songs.map((song) => (
                <div
                    key={song.id}
                    className='
                flex
                items-center
                gap-x-4
                w-full
                '
                >
                    <div className='flex-1'>
                        <MediaItem data={song} onClick={(id: string) => onPlay(id) }/>
                    </div>
                    <LikedButton songId={song.id} />
                </div>
            ))}
        </div>
    );
};

export default SearchContent;