// import { initializeFirestore } from 'firebase/firestore';
import { initFirestore } from '@next-auth/firebase-adapter';
// import GoogleProvider from 'next-auth/providers/google';
import { cert } from 'firebase-admin/app';

/**
 * Initialize firestore with next
 * https://authjs.dev/reference/adapter/firebase#initfirestore
 * Using the google application credentials defined in .env
 */
export const firestore = initFirestore({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
});

/**
 * Initialize next auth
 * Example: https://next-auth.js.org/v3/adapters/firebase#options
 * Firestore Adapter: https://authjs.dev/reference/adapter/firebase
 */
// export default NextAuth({
//   // https://next-auth.js.org/configuration/providers
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || '',
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
//     }),
//   ],
//   adapter: FirestoreAdapter(firestore),
// });

// export const firestore = initializeFirestore(app, {});
