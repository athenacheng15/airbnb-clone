'use client';

import { useEffect } from 'react';

import { EmptyState } from '@Components';

interface ErrorStateProps {
    error: Error;
}

export default ({ error }: ErrorStateProps) => {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return <EmptyState title="Uh oh" subtitle="Something went wrong!" />;
};
