"use server";

import { authConfig } from "config/server-config";
import { getTokens } from "next-firebase-auth-edge/lib/next/tokens";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { privateUserCollection } from "config/server-collections";


export async function addTodo(data: FormData) {
	console.log(data);
	const firstName = data.get("firstName");
	const lastName = data.get("lastName");

	const token = cookies().get("AuthToken");

	console.log("token from server action ", token?.value);

	// await fetch("http://localhost:3000/api/update-name", {
	// 	method: "POST",
	// 	headers: {
	// 		Authorization: `Bearer ${token?.value}`,
	// 		"Content-Type": "application/json",
	// 	},
	// 	body: JSON.stringify({
	// 		id: 1,
	// 		firstName,
	// 		lastName,
	// 	}),
	// });
	if (token) {
		const tokens = await getTokens(cookies(), authConfig);

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
