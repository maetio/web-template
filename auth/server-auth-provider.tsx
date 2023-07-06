import { AuthContextProvider } from "auth/client-auth-provider";
import { getServerAuthUser } from "auth/server";

/**
 * server auth proivder to keep track of user on server
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
	const user = await getServerAuthUser();

	return <AuthContextProvider defaultUser={user}>{children}</AuthContextProvider>;
}
