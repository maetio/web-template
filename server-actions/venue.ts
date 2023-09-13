"use server";

import { revalidatePath } from "next/cache";
import { bucket, venueCollection } from "config/server";
import { getServerAuthUser } from "auth/server";
import { Venue } from "types/venue";

export async function addVenue(venue: Partial<Venue>) {
	try {
		// Get the authenticated user
		const user = await getServerAuthUser();

		if (!user) {
			throw new Error(
				"Cannot update information for unauthenticated user"
			);
		}

		// Add the venue to Firestore
		const venueRef = await venueCollection.add(venue);

		// Create a path for the image
		const path = `venue/${venueRef.id}`;

		// Get the image from venue.images (assuming it's a File)
		const image = venue.images;

		console.log("image from server action", image);

		// Create a reference to the storage bucket
		const file = bucket.file(path);

		// Define custom metadata if needed
		const customMetadata = {
			blurred: "false",
		};

		// Upload the image and set custom metadata
		await file.save(image, {
			metadata: {
				contentType: "jpg",
				customMetadata,
			},
		});

		// Get the download URL
		const [url] = await file.getSignedUrl({
			action: "read",
			expires: "2099-12-31", // Adjust the expiration date as needed
		});

		return url;
	} catch (error) {
		console.error("Error adding venue:", error);
		throw error; // Rethrow the error for handling at a higher level
	}

	revalidatePath("/");
}
