import React, { ReactNode } from "react";
import { CssBaseline } from "@mui/material";
import { MaetAppBar } from "./maet-app-bar";

interface LayoutProps {
	children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
	<>
		<CssBaseline />
		<header>
			<MaetAppBar />
		</header>
		<main>{children}</main>
		<footer>{/* Add your footer component here */}</footer>
	</>
);

export default Layout;
