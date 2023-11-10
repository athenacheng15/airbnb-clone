import { getCurrentUser, getReservations } from '@Actions';

import { ClientOnly, EmptyState } from '@Components';
import TripsClient from './TripsClient';

export default async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please Login" />
            </ClientOnly>
        );
    }

    const reservations = await getReservations({ userId: currentUser.id });
    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No trips found"
                    subtitle="Looks like you havent reserved any trips."
                />
            </ClientOnly>
        );
    }
    return (
        <ClientOnly>
            <TripsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
};
