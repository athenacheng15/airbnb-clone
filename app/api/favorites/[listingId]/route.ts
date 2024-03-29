import { NextResponse } from 'next/server';

import prisma from '@Libs/prismadb';
import { getCurrentUser } from '@Actions';

interface IParams {
    listingId: string;
}

// TODO collect in one function and create action enum
export async function POST(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    const { listingId } = params;
    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds.push(listingId);

    const user = await prisma.user.update({
        where: { id: currentUser.id },
        data: {
            favoriteIds,
        },
    });

    return NextResponse.json(user);
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams },
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    const { listingId } = params;
    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds = favoriteIds.filter(id => id !== listingId);

    const user = await prisma.user.update({
        where: { id: currentUser.id },
        data: {
            favoriteIds,
        },
    });

    return NextResponse.json(user);
}
