"use server";

import { authConfig } from "config/server-config";
import { getTokens } from "next-firebase-auth-edge/lib/next/tokens";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { privateUserCollection } from "config/server-collections";

/**
 * server action mutation example used on in server component.
 * @remarks
 * doing it insdie a formAction or an action like the documentation explains
 * https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions#invocation
 *
 * @export
 * @param {FormData} data
 */
export async function updateUserNameServer(data: FormData) {
	const firstName = data.get("firstName")?.toString();
	const lastName = data?.get("lastName")?.toString();

	// get the token from the cookies
	const tokens = await getTokens(cookies(), authConfig);

	// handle if there is no user
	if (!tokens) {
		throw new Error("Cannot update counter of unauthenticated user");
	}

	if (tokens) {
		if (!tokens) {
			throw new Error("Cannot add name of unauthenticated user");
		}
		// set user data
		await privateUserCollection.doc(tokens.decodedToken.uid).set(
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

/**
 * server action identical to the other example, however needed to change a few types since
 * client called server actions don't use the FormData type
 *
 * @export
 * @param {{
 * 	firstName: string;
 * 	lastName: string;
 * }} data
 */
export async function updateUserNameClient(data: {
	firstName: string;
	lastName: string;
}) {
	const { firstName, lastName } = data;

	// get the token from the cookies
	const tokens = await getTokens(cookies(), authConfig);

	// handle if there is no user
	if (!tokens) {
		throw new Error("Cannot update counter of unauthenticated user");
	}

	if (tokens) {
		if (!tokens) {
			throw new Error("Cannot add name of unauthenticated user");
		}

		// set user data
		await privateUserCollection.doc(tokens.decodedToken.uid).set(
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
