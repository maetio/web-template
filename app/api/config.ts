import { FirebaseOptions, initializeApp, getApps } from "firebase/app";
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
 * Initialize next auth
 * Example: https://next-auth.js.org/v3/adapters/firebase#options
 * Firestore Adapter: https://authjs.dev/reference/adapter/firebase
 */
// export default NextAuth({
//   // https://next-auth.js.org/configuration/providers
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_ID,
//             clientSecret: process.env.GOOGLE_SECRET,
//         }),
//     ],
//     adapter: FirestoreAdapter(firestore),
// });
/**
 * Initialize all the firebase apps
 */
const allApps = getApps();
export const app =
	allApps.length === 0 ? initializeApp(firebaseConfig) : allApps[0];

/**
 * Initialize firestore with next
 * https://authjs.dev/reference/adapter/firebase#initfirestore
 * Using the google application credentials defined in .env
 */
// export const firestore = initFirestore();
// export const firestore = initializeFirestore(app, {});
