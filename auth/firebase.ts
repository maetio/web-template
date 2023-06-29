import { FirebaseApp, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";

const getFirebaseApp = async (options: FirebaseOptions) => {
	const { getApp, getApps, initializeApp } = await import("firebase/app");

	console.log("app length", !getApps().length);
	const thing: FirebaseApp = !getApps().length
		? initializeApp(options)
		: getApp();

	return thing;
};

export const getAuthApp = async (options: FirebaseOptions) => {
	const app = await getFirebaseApp(options);
	// console.log("app from thing", app);

	return getAuth(app);
};

export const useFirebaseAuth = (options: FirebaseOptions) => {
	const getFirebaseAuth = async () => {
		return getAuthApp(options);
	};

	return { getFirebaseAuth };
};
