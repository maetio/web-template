import { FirebaseOptions, getApps, initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';

// get the firebase config
const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

/**
 * Initialize firestore
 */
// export const firestore = initFirestore({
//     credential: cert(firebaseConfig)
// });

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
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app);
export const firestore = initializeFirestore(app, {});