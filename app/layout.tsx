import { MuiProvider } from "app/components/providers/mui";
import "./globals.css";
import { Nunito } from "next/font/google";
import React from "react";
import { Header } from "app/components/header";
import { ServerAuthProvider } from "auth/server-auth-provider";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
	title: "Maet Web Template",
	description: "NextJS, Typescript, MUI, Firebase Auth,",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={nunito.className}>
				{/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
				<ServerAuthProvider>
					<MuiProvider>
						<Header />
						{children}
					</MuiProvider>
				</ServerAuthProvider>

			</body>
		</html>
	);
}
