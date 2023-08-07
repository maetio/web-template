import {
	auth,
	facebookAuthProvider,
	googleAuthProvider,
	privateUserCollection,
} from "config/client";
import { BaseURL } from "config/constants";
import {
	ActionCodeSettings,
	sendSignInLinkToEmail,
	isSignInWithEmailLink,
	signInWithEmailLink,
	signOut,
	signInWithPopup,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInAnonymously,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getAndUpdateUserData } from "server-actions/users";
import { PrivateUserData } from "types/user";

/**
 * Function will send the passwordless login email to the user's email
 * Will be referred back to the link within the application
 *
 * @export
 * @param {string} email
 * @param {string} [referenceLink]
 * @return {*}  {Promise<void>}
 */
export async function sendPasswordlessLoginEmail(
	email: string,
	referenceLink?: string
): Promise<void> {
	const actionCodeSettings: ActionCodeSettings = {
		handleCodeInApp: true,
		// dynamicLinkDomain: process.env.NEXT_PUBLIC_DYNAMIC_LINKS_DOMAIN,
		// URL must be whitelisted in the Firebase Console.
		url: referenceLink || BaseURL,
		iOS: {
			bundleId: "io.maet.mobile",
		},
		android: {
			packageName: "io.maet.mobile",
			installApp: true,
			// minimumVersion: '8',
		},
	};
	await sendSignInLinkToEmail(auth, email, actionCodeSettings);
}

export /**
 * Function will sign in with the email link
 *
 * @param {string} email
 * @param {string} [link]
 * @return {*}
 */
const signInWithLink = async (email: string | null, link: string) => {
	if (!isSignInWithEmailLink(auth, link))
		throw Error(`Not Email Sign in Link: ${link}`);

	if (!email) throw Error(`Not valid email: ${email}`);

	// get user credential and sign in with firebase
	const userCredential = await signInWithEmailLink(auth, email, link);

	// get the id token from firebase
	const idTokenResult = await userCredential.user.getIdTokenResult();

	// set the cookie with firebase auth edge middleware
	// https://github.com/awinogrodzki/next-firebase-auth-edge#example-authprovider
	await fetch("/api/login", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${idTokenResult.token}`,
		},
	});

	// initialize the user data
	await getAndUpdateUserData({
		email: userCredential.user.email,
		emailVerified: userCredential.user.emailVerified,
	});

	// return the user credential
	return userCredential;
};

export /**
 * Function that will sign in with email and password
 *
 * @return {*}
 */
const signInWithEmailPassword = async (
	email: string,
	password: string,
	newUser: boolean
) => {
	if (!email || !password) throw Error("Need both email and password");
	const userCredential = newUser
		? await createUserWithEmailAndPassword(auth, email, password)
		: await signInWithEmailAndPassword(auth, email, password);

	// get the id token from firebase
	const idTokenResult = await userCredential.user.getIdTokenResult();

	// set the cookie with firebase auth edge middleware
	// https://github.com/awinogrodzki/next-firebase-auth-edge#example-authprovider
	await fetch("/api/login", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${idTokenResult.token}`,
		},
	});

	// access firstname lastname
	const nameParts = userCredential.user?.displayName?.split(" ");
	const firstName = nameParts?.at(0);
	const lastName =
		nameParts?.length && nameParts?.length > 1
			? nameParts[nameParts.length - 1]
			: "";

	// initialize the user data
	await getAndUpdateUserData({
		email: userCredential.user.email,
		emailVerified: userCredential.user.emailVerified,
		firstName: firstName || null,
		lastName: lastName || null,
		image: userCredential.user.photoURL,
	});

	// return the user credential
	return userCredential;
};

export /**
 * Function that will sign in with google
 *
 * @return {*}
 */
const signInAsGuest = async () => {
	const userCredential = await signInAnonymously(auth);

	console.log(userCredential);

	// get the id token from firebase
	const idTokenResult = await userCredential.user.getIdTokenResult();

	// set the cookie with firebase auth edge middleware
	// https://github.com/awinogrodzki/next-firebase-auth-edge#example-authprovider
	await fetch("/api/login", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${idTokenResult.token}`,
		},
	});

	// access firstname lastname
	const nameParts = userCredential.user?.displayName?.split(" ");
	const firstName = nameParts?.at(0);
	const lastName =
		nameParts?.length && nameParts?.length > 1
			? nameParts[nameParts.length - 1]
			: "";

	// initialize the user data
	await getAndUpdateUserData({
		email: userCredential.user.email,
		emailVerified: userCredential.user.emailVerified,
		firstName: firstName || "Anonymous",
		lastName: lastName || "User",
		image: userCredential.user.photoURL,
	});

	// return the user credential
	return userCredential;
};

export /**
 * Function that will sign in with google
 *
 * @return {*}
 */
const signInWithGoogle = async () => {
	const userCredential = await signInWithPopup(auth, googleAuthProvider);

	// get the id token from firebase
	const idTokenResult = await userCredential.user.getIdTokenResult();

	// set the cookie with firebase auth edge middleware
	// https://github.com/awinogrodzki/next-firebase-auth-edge#example-authprovider
	await fetch("/api/login", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${idTokenResult.token}`,
		},
	});

	// access firstname lastname
	const nameParts = userCredential.user?.displayName?.split(" ");
	const firstName = nameParts?.at(0);
	const lastName =
		nameParts?.length && nameParts?.length > 1
			? nameParts[nameParts.length - 1]
			: "";

	// initialize the user data
	await getAndUpdateUserData({
		email: userCredential.user.email,
		emailVerified: userCredential.user.emailVerified,
		firstName: firstName || null,
		lastName: lastName || null,
		image: userCredential.user.photoURL,
	});

	// return the user credential
	return userCredential;
};

export /**
 * Function that will sign in with google
 *
 * @return {*}
 */
const signInWithFacebook = async () => {
	const userCredential = await signInWithPopup(auth, facebookAuthProvider);

	// get the id token from firebase
	const idTokenResult = await userCredential.user.getIdTokenResult();

	// set the cookie with firebase auth edge middleware
	// https://github.com/awinogrodzki/next-firebase-auth-edge#example-authprovider
	await fetch("/api/login", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${idTokenResult.token}`,
		},
	});

	// access firstname lastname
	const nameParts = userCredential.user?.displayName?.split(" ");
	const firstName = nameParts?.at(0);
	const lastName =
		nameParts?.length && nameParts?.length > 1
			? nameParts[nameParts.length - 1]
			: "";

	// initialize the user data
	await getAndUpdateUserData({
		email: userCredential.user.email,
		emailVerified: userCredential.user.emailVerified,
		firstName: firstName || null,
		lastName: lastName || null,
		image: userCredential.user.photoURL,
	});

	// return the user credential
	return userCredential;
};

/**
 * Sign out the current user
 * https://firebase.google.com/s/#signout
 * @export
 * @return {*}  {Promise<void>}
 */
export async function signOutUser(): Promise<void> {
	// sign out the current user
	await signOut(auth);

	// Remove authentication cookies for firebase auth edge
	// https://github.com/awinogrodzki/next-firebase-auth-edge#example-authprovider
	await fetch("/api/logout", {
		method: "GET",
	});
}

/**
 * Function will return the private user data
 *
 * @export
 * @param {string} userID
 * @return {*}  {(Promise<{ id: string } & Partial<PrivateUserData>>)}
 */
export async function getPrivateUserData(
	userID: string
): Promise<{ id: string } & Partial<PrivateUserData>> {
	const userDoc = await getDoc(doc(privateUserCollection, userID));
	return { ...userDoc.data(), id: userDoc.id };
}
