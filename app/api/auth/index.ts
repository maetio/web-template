import { app } from 'app/api/config';
import {
	ActionCodeSettings,
	sendSignInLinkToEmail,
	initializeAuth,
} from 'firebase/auth';
// import { initializeFirestore } from 'firebase/firestore';
// import NextAuth from "next-auth";
// import { FirestoreAdapter } from "@next-auth/firebase-adapter";
// import GoogleProvider from "next-auth/providers/google";
// import { initFirestore } from '@next-auth/firebase-adapter';

export const auth = initializeAuth(app);

/**
 * Function will send the passwordless login email to the user's email
 *
 * @export
 * @param {string} email
 * @return {*}  {Promise<void>}
 */
export async function sendPasswordlessLoginEmail(email: string): Promise<void> {
	const actionCodeSettings: ActionCodeSettings = {
		handleCodeInApp: true,
		dynamicLinkDomain: process.env.NEXT_PUBLIC_DYNAMIC_LINKS_DOMAIN,
		// URL must be whitelisted in the Firebase Console.
		url: `https://${process.env.NEXT_PUBLIC_DYNAMIC_LINKS_DOMAIN}`,
		iOS: {
			bundleId: 'io.maet.mobile',
		},
		android: {
			packageName: 'io.maet.mobile',
			installApp: true,
			// minimumVersion: '8',
		},
	};
	console.log(actionCodeSettings);
	return sendSignInLinkToEmail(auth, email, actionCodeSettings);
}
