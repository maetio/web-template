import {
	ActionCodeSettings,
	sendSignInLinkToEmail,
	isSignInWithEmailLink,
	signInWithEmailLink,
	signOut,
	Auth,
} from "firebase/auth";
// import { auth } from "./config";

// import { auth } from "../config/client-config";
// import { auth } from "./config";

/**
 * Function will send the passwordless login email to the user's email
 *
 * @export
 * @param {string} email
 * @return {*}  {Promise<void>}
 */
export async function sendPasswordlessLoginEmail(
	auth: Auth,
	email: string
): Promise<void> {
	const actionCodeSettings: ActionCodeSettings = {
		handleCodeInApp: true,
		// dynamicLinkDomain: process.env.NEXT_PUBLIC_DYNAMIC_LINKS_DOMAIN,
		// URL must be whitelisted in the Firebase Console.
		url:
			process.env.NEXT_PUBLIC_DYNAMIC_LINK ||
			"http://localhost:3000/home",
		iOS: {
			bundleId: "io.maet.mobile",
		},
		android: {
			packageName: "io.maet.mobile",
			installApp: true,
			// minimumVersion: '8',
		},
	};
	return sendSignInLinkToEmail(auth, email, actionCodeSettings);
}

export /**
 * Function will sign in with the email link
 *
 * @param {string} email
 * @param {string} [link]
 * @return {*}
 */
const signInWithLink = async (auth: Auth, email: string, link: string) => {
	if (!isSignInWithEmailLink(auth, link))
		throw Error(`Not Email Sign in Link: ${link}`);
	return signInWithEmailLink(auth, email, link);
};
/**
 * Sign out the current user
 * https://firebase.google.com/s/#signout
 * @export
 * @return {*}  {Promise<void>}
 */
// export async function signOutUser(): Promise<void> {
// 	// sign out the current user
// 	return signOut(auth);
// }
