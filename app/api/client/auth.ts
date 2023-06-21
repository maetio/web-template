import { FirebaseOptions, initializeApp, getApps } from "firebase/app";
import {
	ActionCodeSettings,
	sendSignInLinkToEmail,
	initializeAuth,
	isSignInWithEmailLink,
	signInWithEmailLink,
	signOut
} from "firebase/auth";
// import { initializeFirestore } from 'firebase/firestore';
// import NextAuth from "next-auth";
// import { FirestoreAdapter } from "@next-auth/firebase-adapter";
// import GoogleProvider from "next-auth/providers/google";
// import { initFirestore } from '@next-auth/firebase-adapter';

// get the firebase config
const firebaseConfig: FirebaseOptions = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

/**
 * Initialize all the firebase apps and the auth
 */
const allApps = getApps();
export const app =
	allApps.length === 0 ? initializeApp(firebaseConfig) : allApps[0];
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
		// dynamicLinkDomain: process.env.NEXT_PUBLIC_DYNAMIC_LINKS_DOMAIN,
		// URL must be whitelisted in the Firebase Console.
		url: process.env.NEXT_PUBLIC_DYNAMIC_LINK || "http://localhost:3000/home",
		iOS: {
			bundleId: "io.maet.mobile"
		},
		android: {
			packageName: "io.maet.mobile",
			installApp: true
			// minimumVersion: '8',
		}
	};
	console.log(actionCodeSettings);
	return sendSignInLinkToEmail(auth, email, actionCodeSettings);
}

export /**
 * Function will sign in with the email link
 *
 * @param {string} email
 * @param {string} [link]
 * @return {*}
 */
const signInWithLink = async (email: string, link: string) => {
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
export async function signOutUser(): Promise<void> {
	// sign out the current user
	return signOut(auth);
}
