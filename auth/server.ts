import { getTokens } from "next-firebase-auth-edge/lib/next/tokens";
import { cookies } from "next/headers";
import { FirebaseApiKey, FirebaseAuthEdgeOptions, FirebaseServiceAccount } from "config/constants";
import { getFirebaseAuth } from "next-firebase-auth-edge/lib/auth";
import { AuthUser } from "app/types";

export /**
 * Funtion will fetch the server tokens for the config
 *
 * @param {type} params
 */
const getServerAuthUser = async () => {
	// get the tokens
	const tokens = await getTokens(cookies(), {
		serviceAccount: FirebaseServiceAccount,
		apiKey: FirebaseApiKey,
		cookieName: FirebaseAuthEdgeOptions.cookieName,
		cookieSignatureKeys: FirebaseAuthEdgeOptions.cookieSignatureKeys,
	});

	// Next Firebase Auth Edge provides lower level building blocks for custom functionality
	// https://github.com/awinogrodzki/next-firebase-auth-edge#getfirebaseauth
	const { getUser } = getFirebaseAuth(
		FirebaseServiceAccount,
		FirebaseApiKey
	);
    
	// get the user record
	const userRecord = tokens?.decodedToken.uid ? await getUser(tokens?.decodedToken.uid) : null;

	// set the user value
	const user: AuthUser | null = userRecord ? {
		id: userRecord.uid,
		email: userRecord.email,
		emailVerified: userRecord.emailVerified,
		isAnonymous: false,
		customClaims: userRecord.customClaims,
		phoneNumber: userRecord.phoneNumber
	} : null;

	return user;
};