// "use client";

// import { initializeAuth } from "@firebase/auth";
// import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
// import {
// 	CollectionDataTypes,
// 	PublicUserData,
// 	SubcollectionDataTypes,
// } from "app/types";
// import {
// 	CollectionReference,
// 	DocumentData,
// 	FirestoreDataConverter,
// 	Query,
// 	QueryDocumentSnapshot,
// 	collection,
// 	collectionGroup,
// 	initializeFirestore,
// } from "firebase/firestore";

export const clientConfig = {
	redirectUrl: process.env.NEXT_PUBLIC_REDIRECT_URL!,
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL!,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
};

// /**
//  * Initialize all the firebase apps and the auth
//  */
// export const app = (
// 	!getApps().length ? initializeApp(clientConfig) : getApp()
// ) as FirebaseApp;

// export const auth = initializeAuth(app);

// /**
//  * Initialize firestore and define typed helping collection function
//  * @references
//  * https://plainenglish.io/blog/using-firestore-with-typescript-in-the-v9-sdk-cf36851bb099
//  * https://medium.com/swlh/using-firestore-with-typescript-65bd2a602945
//  */
// export const db = initializeFirestore(app, {
// 	experimentalForceLongPolling: true,
// });

// /**
//  * Generic data type converter from firestore
//  *
//  * @template T
//  */
// const genericConverter = <T>() => ({
// 	toFirestore: (inputData: T) => inputData,
// 	fromFirestore: (snapshot: QueryDocumentSnapshot): T => snapshot.data() as T,
// });

// /**
//  * Create a collection function, using typecasting and the withConverter function to get typed data back from firestore
//  *
//  * @template T
//  * @param {string} collectionName
//  * @return {*}  {CollectionReference<T>}
//  */
// const createCollection = <T = DocumentData>(
// 	collectionName: string
// ): CollectionReference<T> => {
// 	const converter = genericConverter<T>() as FirestoreDataConverter<T>;
// 	return collection(db, collectionName).withConverter<T>(converter);
// };

// /**
//  * Create a collection group, using typecasting and the withConverter function to get typed data back from firestore
//  *
//  * @template T
//  * @param {string} collectionName
//  * @return {*}  {CollectionReference<T>}
//  */
// const createCollectionGroup = <T = DocumentData>(
// 	collectionName: string
// ): Query<T> => {
// 	const converter = genericConverter<T>() as FirestoreDataConverter<T>;
// 	return collectionGroup(db, collectionName).withConverter<T>(converter);
// };

// /**
//  * Define the collections
//  * Assume that the data being returned from the collection is a Partial<>
//  * This is because we do not necessarily know the format of the data in the database
//  * Thus, assuming the data is a partial will allow us to handle failures gracefully in the frontend
//  */
// export const privateUserCollection =
// 	createCollection<CollectionDataTypes["private-user-data"]>(
// 		"private-user-data"
// 	);
// export const publicUserCollection =
// 	createCollection<PublicUserData>("public-user-data");
// export const profileCollection =
// 	createCollection<CollectionDataTypes["profiles"]>("profiles");
// export const competitionsCollection =
// 	createCollection<CollectionDataTypes["competitions"]>("competitions");
// export const teamsCollection =
// 	createCollection<CollectionDataTypes["teams"]>("teams");
// export const gamesCollection =
// 	createCollection<CollectionDataTypes["games"]>("games");
// export const reportsCollection =
// 	createCollection<CollectionDataTypes["reports"]>("reports");

// /**
//  * Define Subcollections as functions
//  * Take in the specific id as an input
//  */
// export const teamProfilesSubcollection = (teamID: string) =>
// 	createCollection<SubcollectionDataTypes["team-profiles"]>(
// 		`teams/${teamID}/team-profiles`
// 	);

// export const teamInvitedEmailSubcollection = (teamID: string) =>
// 	createCollection<SubcollectionDataTypes["invited-emails"]>(
// 		`teams/${teamID}/invited-emails`
// 	);

// export const teamInvitedTeamProfilesSubcollection = (teamID: string) =>
// 	createCollection<SubcollectionDataTypes["invited-team-profiles"]>(
// 		`teams/${teamID}/invited-team-profiles`
// 	);

// export const teamMessagesSubcollection = (teamID: string) =>
// 	createCollection<SubcollectionDataTypes["team-messages"]>(
// 		`teams/${teamID}/team-messages`
// 	);

// export const competitionTeamsSubcollection = (competitionID: string) =>
// 	createCollection<SubcollectionDataTypes["competition-teams"]>(
// 		`competitions/${competitionID}/competition-teams`
// 	);
// export const competitionProfilesSubcollection = (competitionID: string) =>
// 	createCollection<SubcollectionDataTypes["competition-profiles"]>(
// 		`competitions/${competitionID}/competition-profiles`
// 	);
// export const gameProfilesSubcollection = (gameID: string) =>
// 	createCollection<SubcollectionDataTypes["game-profiles"]>(
// 		`games/${gameID}/game-profiles`
// 	);

// // report subcollections
// export const reportProfilesSubcollection = (userID: string) =>
// 	createCollection<SubcollectionDataTypes["report-profiles"]>(
// 		`reports/${userID}/report-profiles`
// 	);
// export const reportCompetitionsSubcollection = (userID: string) =>
// 	createCollection<SubcollectionDataTypes["report-competitions"]>(
// 		`reports/${userID}/report-competitions`
// 	);
// export const reportTeamsSubcollection = (userID: string) =>
// 	createCollection<SubcollectionDataTypes["report-teams"]>(
// 		`reports/${userID}/report-teams`
// 	);

// /**
//  * Define collection groups
//  */
// export const teamProfileCollectionGroup =
// 	createCollectionGroup<SubcollectionDataTypes["team-profiles"]>(
// 		"team-profiles"
// 	);
// export const gameProfileCollectionGroup =
// 	createCollectionGroup<SubcollectionDataTypes["game-profiles"]>(
// 		"game-profiles"
// 	);
