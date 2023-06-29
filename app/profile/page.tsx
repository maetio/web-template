import Link from "next/link";
import { UserProfile } from "app/components/layout/user-profile";
import { ServerAuthProvider } from "auth/server-auth-provider";

/**
 * server component that displays the profile screen
 *
 * @export
 * @return {*}
 */
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
