"use server";

import { revalidatePath } from "next/cache";
import { privateUserCollection } from "config/server";
import { getServerAuthUser } from "auth/server";
import { PrivateUserData } from "../types";

/**
 * Server action that updates the user's information
 * @remarks
 * doing it insdie a formAction or an action like the documentation explains
 * https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions#invocation
 *
 * @export
 * @param {Partial<PrivateUserData>} userData
 */
export async function updateUserData(userData: Partial<PrivateUserData>) {
	// get the user for the server
	const user = await getServerAuthUser();

	// handle if there is no user
	if (!user) {
		throw new Error("Cannot update information for unauthenticated user");
	}

	// set user data
	await privateUserCollection.doc(user.id).set(userData, { merge: true });

	revalidatePath("/");
}
