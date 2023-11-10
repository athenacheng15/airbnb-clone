'use client';

import type { SafeUser } from '@Types';

import Image from 'next/image';

import useCountries from '@Hooks/useCountries';

import { Heading, HeartButton } from '@Components';

interface ListingHeadProps {
    title: string;
    imageSrc: string;
    locationValue: string;
    id: string;
    currentUser: SafeUser | null;
}

export default ({
    title,
    imageSrc,
    locationValue,
    id,
    currentUser,
}: ListingHeadProps) => {
    const { getByValue } = useCountries();
    const location = getByValue(locationValue);
    return (
        <>
            <Heading
                title={title}
                subtitle={`${location?.region}, ${location?.label} `}
            />
            <div className="w-fill h-[60vh] overflow-hidden rounded-xl relative">
                <Image
                    fill
                    alt="Image"
                    src={imageSrc}
                    className="object-cover w-full"
                />
                <div className="absolute top-5 right-5">
                    <HeartButton listingId={id} currentUser={currentUser} />
                </div>
            </div>
        </>
    );
};
