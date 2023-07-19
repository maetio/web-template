"use server";

import { revalidatePath } from "next/cache";
import { privateUserCollection } from "config/server";
import { getServerAuthUser } from "auth/server";
import { PrivateUserData } from "../types";

export async function getStripeSession(
	userData: Omit<Partial<PrivateUserData>, "id"> | undefined
) {
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
		email: user.email || null,
		emailVerified: user.emailVerified,
		isAnonymous: user.isAnonymous,
		phoneNumber: user.phoneNumber || null,
		loggedIn: true,
		firstName: null,
		lastName: null,
		image: null,
	};

	// merge the data to create the updated user data
	const updatedUserData: PrivateUserData = {
		...initialUserData,
		...existingUserDoc.data(),
		...userData,
	};

	// update the user data
	await privateUserCollection
		.doc(user.id)
		.set(updatedUserData, { merge: true });

	// revalidate the path
	revalidatePath("/");

	return updatedUserData;
}
