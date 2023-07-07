"use server";

import { revalidatePath } from "next/cache";
import { privateUserCollection } from "config/server";
import { getServerAuthUser } from "auth/server";
import { PrivateUserData } from "app/types";

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

export async function getAndUpdateUserData(userData: Omit<Partial<PrivateUserData>, "id">) {
	// get the user for the server
	const user = await getServerAuthUser();

	// handle if there is no user
	if (!user) {
		throw new Error("Cannot update information for unauthenticated user");
	}

	// check if user data
	const existingUserDoc = await privateUserCollection.doc(user.id).get();

	// set updated user data
	const initialUserData: PrivateUserData = {
		id: user.id,
		email: user.email,
		emailVerified: user.emailVerified,
		isAnonymous: user.isAnonymous,
		phoneNumber: user.phoneNumber,
		loggedIn: true,
		firstName: null,
		lastName: null,
		image: null,
		stripeID: undefined,
		activeSport: undefined,
	};

	// merge the data to create the updated user data
	const updatedUserData: PrivateUserData = { ...initialUserData, ...existingUserDoc.data(), ...userData };

	// update the user data
	await privateUserCollection.doc(user.id).set(updatedUserData, { merge: true });

	// revalidate the path
	revalidatePath("/");

	return updatedUserData;
}
