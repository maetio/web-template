"use client";

import { MuiProvider } from "app/components/providers/mui";
import "./globals.css";
import { Nunito } from "next/font/google";
import { AuthContextProvider } from "app/components/providers/auth-context";
import RecoilRootProvider from "app/components/providers/recoil";
import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import React from "react";
import getDesignTokens from "./theme";

const nunito = Nunito({ subsets: ["latin"] });
// had to comment out metadata export for now because of "use client directive"

/* export const metadata = {
	title: "Maet Web Template",
	description: "NextJS, Typescript, MUI, Firebase starter",
}; */


function CustomThemeProvider({children}: {children: React.ReactNode }) {
	// for setting color mode
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	// Update the theme only if the mode changes
	const theme = React.useMemo(() => createTheme(getDesignTokens(prefersDarkMode ? "dark" : "light")), [prefersDarkMode]);
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}




export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={nunito.className}>
				<RecoilRootProvider>
					<AuthContextProvider>
						<MuiProvider>
							<CustomThemeProvider>
								{children}
							</CustomThemeProvider>
						</MuiProvider>
					</AuthContextProvider>
				</RecoilRootProvider>
			</body>
		</html>
	);
}
