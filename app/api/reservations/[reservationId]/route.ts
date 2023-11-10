import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import { getCurrentUser } from '@Actions';

interface IParams {
    reservationId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams },
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== 'string') {
        throw new Error('Invalid ID');
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            // the people who can delete the reservation are only the creater of the reservation
            // or the creator of the listing that the reservation is on
            OR: [
                { userId: currentUser.id },
                { listing: { userId: currentUser.id } },
            ],
        },
    });

    return NextResponse.json(reservation);
}
