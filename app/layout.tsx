import { Nunito } from 'next/font/google';

import './globals.css';

import ToasterProvider from './providers/ToasterProvider';
import { getCurrentUser } from '@Actions';

import { ClientOnly } from '@Components';
import Navbar from '@Components/Navbar';
import {
    RegisterModal,
    RentModal,
    LoginModal,
    SearchModal,
} from '@Components/modals';

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
    title: 'Airbnb',
    description: 'Airbnb clone',
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentUser = await getCurrentUser();
    return (
        <html lang="en">
            <body className={font.className}>
                <ClientOnly>
                    <ToasterProvider />
                    <RentModal />
                    <SearchModal />
                    <LoginModal />
                    <RegisterModal />
                    <Navbar currentUser={currentUser} />
                </ClientOnly>
                <div className="pb-20 pt-28">{children}</div>
            </body>
        </html>
    );
}
