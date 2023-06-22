import { MuiProvider } from "app/components/providers/mui";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "app/components/providers/auth-context";
import RecoilRootProvider from "app/components/providers/recoil";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Maet Web Template",
	description: "NextJS, Typescript, MUI, Firebase starter",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<RecoilRootProvider>
					<AuthContextProvider>
						<MuiProvider>{children}</MuiProvider>
					</AuthContextProvider>
				</RecoilRootProvider>
			</body>
		</html>
	);
}
