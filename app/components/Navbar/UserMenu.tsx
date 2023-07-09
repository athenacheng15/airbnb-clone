"use client";

import type { SafeUser } from "@/app/types";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

interface UserMenuProps {
	currentUser?: SafeUser | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const toggleOpen = useCallback(() => {
		setIsOpen((value) => !value);
	}, []);

	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				<div
					className="hidden md:block test-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
					onClick={() => {}}
				>
					Airbnb your home
				</div>
				<div
					className="flex flex-row items-center p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 rounded-full hover:bg-neutral-100 gap-3 hover:shadow-md transition cursor-pointer"
					onClick={toggleOpen}
				>
					<AiOutlineMenu />
					<div className="hidden md:block">
						<Avatar />
					</div>
				</div>
			</div>
			{isOpen && (
				<div className=" absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
					<div className="flex flex-col cursor-pointer">
						{currentUser ? (
							<>
								<MenuItem label="My trips" onClick={() => {}} />
								<MenuItem label="My favorites" onClick={() => {}} />
								<MenuItem label="My reservations" onClick={() => {}} />
								<MenuItem label="My properties" onClick={() => {}} />
								<MenuItem label="Airbnb my home" onClick={() => {}} />
								<hr />
								<MenuItem label="logout" onClick={() => signOut()} />
							</>
						) : (
							<>
								<MenuItem label="Login" onClick={loginModal.onOpen} />
								<MenuItem label="Sign up" onClick={registerModal.onOpen} />
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
