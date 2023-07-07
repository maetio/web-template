"use server";

import { revalidatePath } from "next/cache";
import { privateUserCollection } from "config/server";
import { getServerAuthUser } from "auth/server";

/**
 * server action mutation example used on in server component.
 * @remarks
 * doing it insdie a formAction or an action like the documentation explains
 * https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions#invocation
 *
 * @export
 * @param {FormData} data
 */
export async function updateUserData(data: FormData) {
	const firstName = data?.get("firstName")?.toString();
	const lastName = data?.get("lastName")?.toString();

	// get the user for the server
	const user = await getServerAuthUser();

	// handle if there is no user
	if (!user) {
		throw new Error("Cannot update counter of unauthenticated user");
	}

	if (user) {
		if (!user) {
			throw new Error("Cannot add name of unauthenticated user");
		}
		// set user data
		await privateUserCollection.doc(user.id).set(
			{
				firstName: firstName || "",
				lastName: lastName || "",
				id: user.id,
			},
			{ merge: true }
		);
	}

	revalidatePath("/");
}
