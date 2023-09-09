import "./globals.css";
import { Nunito } from "next/font/google";
import React from "react";
import { Header } from "app/components/header";
import { ServerAuthProvider } from "auth/server-auth-provider";
import { Footer } from "app/components/footer";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
	title: "Maet",
	description: "Play On.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`${nunito.className} flex flex-col items-center justify-between bg-gray-100`}
			>
				<ServerAuthProvider>
					<Header />
					<div className="w-full max-w-[1600px] px-2.5 pt-20">
						{children}
					</div>
					<Footer />
				</ServerAuthProvider>
			</body>
		</html>
	);
}
