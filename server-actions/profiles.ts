"use server";

import { InitialRating, NullRating } from "constants/rating";
import { PrivateUserData, Profile } from "types/index";
import { profileCollection } from "config/server";

export /**
 * Function will fetch the profile
 *
 * @param {string} userID
 * @param {Profile["sport"]} sport
 * @param {Profile["type"]} type
 * @return {*} 
 */
const getProfile = async (
	userID: string,
	sport: Profile["sport"] | string,
	type: Profile["type"],
) => {
	// fetch the player
	const querySnapshot = await profileCollection.where("userID", "==", userID).where("sport", "==", sport).where("type", "==", type).orderBy("rating.numGames", "desc").limit(1).get();
	return querySnapshot.docs.at(0);
};

/**
 * Function will create a profile for the user if it does not exist, otherwise will fetch if it does
 *
 * @export
 * @param {PrivateUserData} user
 * @param {Profile['sport']} sport
 * @param {Profile['type']} type
 * @return {*}  {(Promise<{ id: string } & Partial<Profile>>)}
 */
export const getOrCreateProfile = async (
	user: PrivateUserData,
	sport: Profile["sport"],
	type: Profile["type"],
): Promise<{ id: string; userID: string } & Partial<Profile>> => {
	const profile = await getProfile(user.id, sport, type);

	// make a profile for this if it is not generated
	if (!profile) {
		const newProfile: { userID: string } & Omit<Profile, "id"> = {
			firstName: user.firstName || null,
			lastName: user.lastName || null,
			image: user.image || null,
			userID: user.id,
			type,
			sport,
			rating: InitialRating,
			deltaRating: NullRating,
		};
		const docRef = await profileCollection.add(newProfile);
		return { id: docRef.id, ...newProfile };
	}
	return { ...profile, userID: user.id };
};