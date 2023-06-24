import { Nunito } from "next/font/google";

import "./globals.css";

import Navbar from "./components/Navbar";
import ClientOnly from "./components/ClientOnly";
import Modals from "./components/Modals/Modal";
import RegisterModal from "./components/Modals/RegisterModal";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
	title: "Airbnb",
	description: "Airbnb clone",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={font.className}>
				<ClientOnly>
					<RegisterModal />
					<Navbar />
				</ClientOnly>
				{children}
			</body>
		</html>
	);
}
