'use client';

import type { SafeUser } from '@/app/types';

import { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import useRegisterModal from '@Hooks/useRegisterModal';
import useLoginModal from '@Hooks/useLoginModal';
import useRentModal from '@Hooks/useRentModal';

import { Avatar } from '@Components';
import MenuItem from './MenuItem';

interface UserMenuProps {
    currentUser?: SafeUser | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleOpen = useCallback(() => {
        setIsOpen(value => !value);
    }, []);

    const onRent = useCallback(() => {
        if (!currentUser) {
            loginModal.onOpen();
            return;
        }
        rentModal.onOpen();
    }, [currentUser, loginModal, rentModal]);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    className="hidden md:block test-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                    onClick={onRent}
                >
                    Airbnb your home
                </div>
                <div
                    className="flex flex-row items-center p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 rounded-full hover:bg-neutral-100 gap-3 hover:shadow-md transition cursor-pointer"
                    onClick={toggleOpen}
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className=" absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <MenuItem
                                    label="My trips"
                                    onClick={() => router.push('/trips')}
                                />
                                <MenuItem
                                    label="My favorites"
                                    onClick={() => router.push('/favorites')}
                                />
                                <MenuItem
                                    label="My reservations"
                                    onClick={() => router.push('/reservations')}
                                />
                                <MenuItem
                                    label="My properties"
                                    onClick={() => router.push('/properties')}
                                />
                                <MenuItem
                                    label="Airbnb my home"
                                    onClick={rentModal.onOpen}
                                />
                                <hr />
                                <MenuItem
                                    label="logout"
                                    onClick={() => signOut()}
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    label="Login"
                                    onClick={loginModal.onOpen}
                                />
                                <MenuItem
                                    label="Sign up"
                                    onClick={registerModal.onOpen}
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
