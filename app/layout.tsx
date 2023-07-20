import "./globals.css";
import { Nunito } from "next/font/google";
import React from "react";
import { Header } from "app/components/header";
import { ServerAuthProvider } from "auth/server-auth-provider";

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
			<body className={nunito.className}>
				<ServerAuthProvider>
					<Header />
					{children}
				</ServerAuthProvider>
			</body>
		</html>
	);
}
