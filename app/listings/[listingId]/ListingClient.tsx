'use client';

import type { SafeListings, SafeUser } from '@/app/types';

import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';

import { Reservation } from '@prisma/client';

import useLoginModal from '@/app/hooks/useLoginModal';
import Container from '@/app/components/Container';
import { categories } from '@/app/components/Navbar/constant';
import ListingHead from '@/app/components/listings/ListingHead';
import ListingInfo from '@/app/components/listings/ListingInfo';
import ListingReservation from '@/app/components/listings/ListingReservation';

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
};

interface ListingClientProps {
    reservations?: Reservation[];
    listing: SafeListings & { user: SafeUser };
    currentUser: SafeUser | null;
}

export default ({
    reservations = [],
    listing,
    currentUser,
}: ListingClientProps) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState(initialDateRange);

    const category = useMemo(() => {
        return categories.find(item => item.label === listing.category);
    }, [listing.category]);

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];
        reservations.forEach(reservation => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate),
            });
            dates = [...dates, ...range];
        });
        return dates;
    }, [reservations]);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) return loginModal.onOpen();
        setIsLoading(true);
        axios
            .post('/api/reservations', {
                totalPrice,
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                listingId: listing?.id,
            })
            .then(() => {
                toast.success('Listind reserved!');
                setDateRange(initialDateRange);

                // TODO redirect to /trips
                router.refresh();
            })
            .catch(() => {
                toast.error('Something went wrong.');
            })
            .finally(() => setIsLoading(false));
    }, [currentUser, dateRange, listing?.id, loginModal, router, totalPrice]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate,
            );
            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price]);

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomcount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroonmCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />
                        <div className="order-first mb-3 md:order-last md:col-span-3">
                            <ListingReservation
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={value => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};