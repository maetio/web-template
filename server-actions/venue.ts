"use server";

import { revalidatePath } from "next/cache";
import { venueCollection } from "config/server";
import { getServerAuthUser } from "auth/server";
import { Venue } from "types/venue";

export async function updateVenue(venue: Partial<Venue>, venueID?: string) {
	try {
		// Get the authenticated user
		const user = await getServerAuthUser();

		if (!user) {
			throw new Error(
				"Cannot update information for unauthenticated user"
			);
		}

		if (!venueID) {
			// Add the venue to Firestore
			const venueRef = await venueCollection.add(venue);

			return venueRef.id;
		}
		await venueCollection.doc(venueID).update(venue);

		return venueID;
	} catch (error) {
		console.error("Error adding venue:", error);
		throw error; // Rethrow the error for handling at a higher level
	}

	revalidatePath("/");
}
