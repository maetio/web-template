import { AuthContextProvider } from "auth/auth-context-provider";
import { getServerAuthUser } from "auth/server";

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
	// fetch the server auth user
	const user = await getServerAuthUser();

	return <AuthContextProvider defaultUser={user}>{children}</AuthContextProvider>;
}
