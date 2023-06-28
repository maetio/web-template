import Link from "next/link";
import { UserProfile } from "app/UserProfile/index";
import { ServerAuthProvider } from "auth/server-auth-provider";

export default function Profile() {
	return (
		<div>
			<nav>
				<Link href="/">
					<text>Go back to home page</text>
				</Link>
			</nav>
			<h1>Profile page</h1>
			<p>This page is server-side rendered</p>
			<ServerAuthProvider>
				<UserProfile />
			</ServerAuthProvider>
		</div>
	);
}
