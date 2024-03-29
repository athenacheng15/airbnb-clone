import { getCurrentUser, getListingById, getReservations } from '@Actions';

import { ClientOnly, EmptyState } from '@Components';
import ListingClient from './ListingClient';

interface IParams {
    listingId: string;
}

export default async ({ params }: { params: IParams }) => {
    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();

    if (!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        );
    }
    return (
        <ClientOnly>
            <ListingClient
                listing={listing}
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
};
