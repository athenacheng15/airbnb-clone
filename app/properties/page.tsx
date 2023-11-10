import { getCurrentUser, getListings } from '@Actions';

import { ClientOnly, EmptyState } from '@Components';
import PorpertiesClient from './PorpertiesClient';

export default async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please Login" />
            </ClientOnly>
        );
    }

    const listings = await getListings({ userId: currentUser.id });
    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No properties found"
                    subtitle="Looks like you have no properties."
                />
            </ClientOnly>
        );
    }
    return (
        <ClientOnly>
            <PorpertiesClient listings={listings} currentUser={currentUser} />
        </ClientOnly>
    );
};
