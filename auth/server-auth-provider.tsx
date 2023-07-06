import { getTokens } from "next-firebase-auth-edge/lib/next/tokens";
import { cookies } from "next/headers";
import { Tokens } from "next-firebase-auth-edge/lib/auth";
import { filterStandardClaims } from "next-firebase-auth-edge/lib/auth/tenant";
import { AuthProvider } from "../auth/client-auth-provider";
import { Tenant } from "./types";


/**
 * takes token and store tenant value in server
 *
 * @param {Tokens} { token, decodedToken }
 * @return {*}  {Tenant}
 */
const mapTokensToTenant = ({ token, decodedToken }: Tokens): Tenant => {
	const customClaims = filterStandardClaims(decodedToken);

	const {
		uid,
		email,
		email_verified: emailVerified,
		picture: photoURL,
		name: displayName,
	} = decodedToken;

	return {
		id: uid,
		email: email ?? null,
		customClaims,
		isAnonymous: !emailVerified,
		emailVerified: emailVerified ?? false,
		name: displayName ?? null,
		photoUrl: photoURL ?? null,
		idToken: token,
	};
};

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
	const tokens = await getTokens(cookies(), {
		serviceAccount: serverConfig.serviceAccount,
		apiKey: serverConfig.firebaseApiKey,
		cookieName: "AuthToken",
		cookieSignatureKeys: ["secret1", "secret2"],
	});

	const tenant = tokens ? mapTokensToTenant(tokens) : null;

	return <AuthProvider defaultTenant={tenant}>{children}</AuthProvider>;
}
