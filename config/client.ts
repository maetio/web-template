import { getApps, initializeApp } from "firebase/app";
import { FacebookAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";
import {
	QueryDocumentSnapshot,
	DocumentData,
	CollectionReference,
	FirestoreDataConverter,
	collection,
	initializeFirestore,
} from "firebase/firestore";
import { CollectionDataTypes } from "types/firebase";
import Cookies from "universal-cookie";

// define universal cookie header
export const UniversalCookies = new Cookies();

// define client configuration
export const clientConfig = {
	redirectUrl: process.env.NEXT_PUBLIC_REDIRECT_URL,
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// define the apps
const allApps = getApps();
export const app =
	allApps.length === 0 ? initializeApp(clientConfig) : allApps[0];

// export client auth
export const auth = getAuth(app);

// export google auth provider
export const googleAuthProvider = new GoogleAuthProvider();

// facebook auth provider
export const facebookAuthProvider = new FacebookAuthProvider();

/**
 * Initialize firestore and define typed helping collection function
 * @references
 * https://plainenglish.io/blog/using-firestore-with-typescript-in-the-v9-sdk-cf36851bb099
 * https://medium.com/swlh/using-firestore-with-typescript-65bd2a602945
 */
export const db = initializeFirestore(app, {
	experimentalForceLongPolling: true,
});

/**
 * Generic data type converter from firestore
 *
 * @template T
 */
const genericConverter = <T>() => ({
	toFirestore: (inputData: T) => inputData,
	fromFirestore: (snapshot: QueryDocumentSnapshot): T => snapshot.data() as T,
});

/**
 * Create a collection function, using typecasting and the withConverter function to get typed data back from firestore
 *
 * @template T
 * @param {string} collectionName
 * @return {*}  {CollectionReference<T>}
 */
const createCollection = <T = DocumentData>(
	collectionName: string
): CollectionReference<T> => {
	const converter = genericConverter<T>() as FirestoreDataConverter<T>;
	return collection(db, collectionName).withConverter<T>(converter);
};

/**
 * Define the collections
 * Assume that the data being returned from the collection is a Partial<>
 * This is because we do not necessarily know the format of the data in the database
 * Thus, assuming the data is a partial will allow us to handle failures gracefully in the frontend
 */
export const privateUserCollection =
	createCollection<CollectionDataTypes["private-user-data"]>(
		"private-user-data"
	);
