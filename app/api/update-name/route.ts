import { NextRequest, NextResponse } from "next/server";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { getTokens } from "next-firebase-auth-edge/lib/next/tokens";
import { authConfig } from "config/server-config";
import { privateUserCollection } from "config/server-collections";

/**
 * post request to add firstname and lastname to DB
 *
 * @export
 * @param {NextRequest} request
 * @return {*}
 */
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
