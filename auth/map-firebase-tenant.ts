import { AuthError, IdTokenResult, User as FirebaseUser } from "firebase/auth";
import { filterStandardClaims } from "next-firebase-auth-edge/lib/auth/tenant";
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