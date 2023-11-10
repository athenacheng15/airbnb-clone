'use client';
import type { SafeListings, SafeReservation, SafeUser } from '@Types';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';

import useCountries from '@Hooks/useCountries';

import { HeartButton, Button } from '@Components';

interface ListingCardProps {
    data: SafeListings;
    reservation?: SafeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

export default ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = '',
    currentUser,
}: ListingCardProps) => {
    const router = useRouter();
    const { getByValue } = useCountries();
    const location = getByValue(data.locationValue);

    const handleCancle = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            if (disabled) return;

            onAction?.(actionId);
        },
        [onAction, actionId, disabled],
    );

    const price = useMemo(() => {
        if (reservation) return reservation.totalPrice;
        return data.price;
    }, [data.price, reservation]);

    const reservationDate = useMemo(() => {
        if (!reservation) return null;
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`;
    }, [reservation]);

    return (
        <div
            className="col-span-1 cursor-pointer group"
            onClick={() => router.push(`/listings/${data.id}`)}
        >
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image
                        fill
                        alt="Listing"
                        src={data.imageSrc}
                        className=" object-cover h-full w-full group-hover:scale-110 transition"
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {location?.region}, {location?.label}
                </div>
                <div className="font-light text-neutral-500">
                    {reservationDate || data.category}
                </div>
                <div className=" flex flex-row items-center gap-1">
                    <div className="font-semibold">$ {price}</div>
                    {!reservation && <div className="font-light">night</div>}
                </div>
                {onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancle}
                    />
                )}
            </div>
        </div>
    );
};
