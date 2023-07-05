import { getTokens } from "next-firebase-auth-edge/lib/next/tokens";
import { cookies } from "next/headers";
import { Tokens } from "next-firebase-auth-edge/lib/auth";
import { filterStandardClaims } from "next-firebase-auth-edge/lib/auth/tenant";
import { AuthError, IdTokenResult, User as FirebaseUser } from "firebase/auth";
import { AuthProvider } from "./client-auth-provider";
import { serverConfig } from "../config/server-config";
import { Tenant } from "./types";

const CREDENTIAL_ALREADY_IN_USE_ERROR = "auth/credential-already-in-use";
export const isCredentialAlreadyInUseError = (e: AuthError) =>
	e?.code === CREDENTIAL_ALREADY_IN_USE_ERROR;

export /**
 * used for adding for adding tenant to global state
 *
 * @param {IdTokenResult} result
 * @param {FirebaseUser} user
 * @return {*}  {Promise<Tenant>}
 */
const mapFirebaseResponseToTenant = async (
	result: IdTokenResult,
	user: FirebaseUser
): Promise<Tenant> => {
	const providerData = user.providerData && user.providerData[0];
	const tokenResult = await user.getIdTokenResult();

	if (!user.isAnonymous && user.emailVerified && providerData) {
		return {
			id: user.uid,
			name:
				providerData.displayName ||
				user.displayName ||
				user.email ||
				null,
			email: providerData.email || null,
			isAnonymous: false,
			emailVerified: user.emailVerified,
			customClaims: filterStandardClaims(tokenResult.claims),
			photoUrl: providerData.photoURL || user.photoURL || null,
			idToken: tokenResult.token,
		};
	}

	return {
		id: user.uid,
		name:
			user.displayName || providerData?.displayName || user.email || null,
		email: user.email || null,
		isAnonymous: true,
		emailVerified: user.emailVerified,
		photoUrl: user.photoURL || providerData?.photoURL || null,
		customClaims: filterStandardClaims(tokenResult.claims),
		idToken: tokenResult.token,
	};
};

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
