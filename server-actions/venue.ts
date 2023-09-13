"use server";

import { revalidatePath } from "next/cache";
import { venueCollection } from "config/server";
import { getServerAuthUser } from "auth/server";
import { Venue } from "types/venue";

export async function addVenue(venue: Partial<Venue>) {
	// get the user for the server
	const user = await getServerAuthUser();

	// handle if there is no user
	if (!user) {
		throw new Error("Cannot update information for unauthenticated user");
	}

	// set user data
	await venueCollection.add(venue);

	revalidatePath("/");
}
