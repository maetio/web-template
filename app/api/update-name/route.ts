import { NextRequest, NextResponse } from "next/server";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { getTokens } from "next-firebase-auth-edge/lib/next/tokens";
import { authConfig } from "config/server-config";
import { privateUserCollection } from "config/server-collections";

// const initializeApp = () => {
// 	return admin.initializeApp({
// 		credential: admin.credential.cert(authConfig.serviceAccount),
// 	});
// };

// const getFirebaseAdminApp = () => {
// 	if (admin.apps.length > 0) {
// 		return admin.apps[0] as admin.app.App;
// 	}

// 	// admin.firestore.setLogFunction(console.log);

// 	return initializeApp();
// };

export async function POST(request: NextRequest) {
	const tokens = await getTokens(request.cookies, authConfig);

	const { firstName, lastName, id } = await request.json();

	console.log("body in the request", firstName, lastName, id);

	console.log("token information", tokens);

	console.log("fired");

	if (!tokens) {
		throw new Error("Cannot add name of unauthenticated user");
	}

	// const db = getFirestore(getFirebaseAdminApp());
	const snapshot = await privateUserCollection
		.doc(tokens.decodedToken.uid)
		.set(
			{ firstName, lastName, id: tokens.decodedToken.uid },
			{ merge: true }
		);

	return NextResponse.json(snapshot);
}
