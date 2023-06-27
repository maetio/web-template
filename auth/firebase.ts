import { FirebaseApp, FirebaseOptions } from "@firebase/app";
import { getAuth } from "@firebase/auth";

const getFirebaseApp = async (options: FirebaseOptions) => {
	const { getApp, getApps, initializeApp } = await import("firebase/app");

	return (
		!getApps().length ? initializeApp(options) : getApp()
	) as FirebaseApp;
};

export const getAuthApp = async (options: FirebaseOptions) => {
	const app = await getFirebaseApp(options);
	console.log("app from thing", app);

	return getAuth(app);
};

export const useFirebaseAuth = (options: FirebaseOptions) => {
	const getFirebaseAuth = async () => {
		return getAuthApp(options);
	};

	return { getFirebaseAuth };
};
