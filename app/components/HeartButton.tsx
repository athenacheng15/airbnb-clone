'use client';

import type { SafeUser } from '@Types';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import useFavorite from '@Hooks/useFavorite';

interface HeartButtonProps {
    listingId: string;
    currentUser?: SafeUser | null;
}

export default ({ listingId, currentUser }: HeartButtonProps) => {
    const { hasFavorited, toggleFavorite } = useFavorite({
        listingId,
        currentUser,
    });
    return (
        <div
            onClick={toggleFavorite}
            className="relative hover:opacity-80 transition cursor-pointer"
        >
            <AiOutlineHeart
                size={28}
                className=" fill-white absolute -top-[2px] -right-[2px]"
            />
            <AiFillHeart
                size={24}
                className={`${
                    hasFavorited ? 'fill-rose-500' : ' fill-neutral-500/70'
                }`}
            />
        </div>
    );
};
