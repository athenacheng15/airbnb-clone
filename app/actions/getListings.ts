import prisma from "@/app/libs/prismadb";

export default async () => {
    try {
        const listing = await prisma.listing.findMany({
            orderBy: {
                createAt: "desc",
            },
        });
        return listing;
    } catch (error: any) {
        throw new Error(error);
    }
};
