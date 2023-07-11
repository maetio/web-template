"use server";

import { AuthContextProvider } from "auth/auth-context-provider";
import { getUserData } from "server-actions/users";
import { PrivateUserData } from "types/user";

/**
 * Server auth proivder to keep track of user on server
 *
 * @export
 * @param {{
 * 	children: React.ReactNode;
 * }} {
 * 	children,
 * }
 * @return {*}
 */
export async function ServerAuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	// fetch the server user
	const userData = await getUserData();

	// set the default data
	const defaultUser: PrivateUserData = {
		...userData,
		id: userData?.id || "",
		email: userData?.email,
		emailVerified: userData?.emailVerified || false,
		isAnonymous: false,
		phoneNumber: userData?.phoneNumber,
		loggedIn: true,
	};

	return <AuthContextProvider defaultUser={userData?.id ? defaultUser : null}>{children}</AuthContextProvider>;
}
