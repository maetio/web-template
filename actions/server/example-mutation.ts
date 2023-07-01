"use server";

import { authConfig } from "config/server-config";
import { getTokens } from "next-firebase-auth-edge/lib/next/tokens";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { privateUserCollection } from "config/server-collections";

export async function updateUserNameServer(data: FormData) {
	const firstName = data.get("firstName")?.toString();
	const lastName = data?.get("lastName")?.toString();

	const tokens = await getTokens(cookies(), authConfig);

	if (!tokens) {
		throw new Error("Cannot update counter of unauthenticated user");
	}

	if (tokens) {
		// const { firstName, lastName, id } = await request.json();

		console.log("body in the request", firstName, lastName, 1);

		console.log("token information", tokens);

		console.log("fired");

		if (!tokens) {
			throw new Error("Cannot add name of unauthenticated user");
		}

		// const db = getFirestore(getFirebaseAdminApp());
		const snapshot = await privateUserCollection
			.doc(tokens.decodedToken.uid)
			.set(
				{
					firstName: firstName || "",
					lastName: lastName || "",
					id: tokens.decodedToken.uid,
				},
				{ merge: true }
			);
	}

	revalidatePath("/");
}

export async function updateUserNameClient(data: {
	firstName: string;
	lastName: string;
}) {
	const { firstName, lastName } = data;

	const tokens = await getTokens(cookies(), authConfig);

	if (!tokens) {
		throw new Error("Cannot update counter of unauthenticated user");
	}

	if (tokens) {
		console.log("body in the request", firstName, lastName, 1);

		console.log("token information", tokens);

		console.log("fired");

		if (!tokens) {
			throw new Error("Cannot add name of unauthenticated user");
		}

		// const db = getFirestore(getFirebaseAdminApp());
		const snapshot = await privateUserCollection
			.doc(tokens.decodedToken.uid)
			.set(
				{
					firstName: firstName || "",
					lastName: lastName || "",
					id: tokens.decodedToken.uid,
				},
				{ merge: true }
			);
	}

	revalidatePath("/");
}
