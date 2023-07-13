"use server";

import { InitialRating, NullRating } from "constants/rating";
import {
	Competition,
	CompetitionProfile,
	PrivateUserData,
	Profile,
	Team,
} from "types/index";
import {
	competitionProfilesSubcollection,
	profileCollection,
} from "config/server";
import { BaseURL } from "config/constants";
import { PlayerResponseType } from "types/next-api";

export /**
 * Function will fetch the profile
 *
 * @param {string} userID
 * @param {Profile["sport"]} sport
 * @param {Profile["type"]} type
 * @return {*}
 * @return {*}
 */
const getProfile = async (
	userID: string,
	sport: Profile["sport"] | string,
	type: Profile["type"]
) => {
	try {
	// fetch the player
		const querySnapshot = await profileCollection
			.where("userID", "==", userID)
			.where("sport", "==", sport)
			.where("type", "==", type)
			.orderBy("rating.numGames", "desc")
			.limit(1)
			.get();
		const mainProfileDoc = querySnapshot.docs.at(0);
		
		return mainProfileDoc?.exists ? { ...mainProfileDoc.data(), id: mainProfileDoc.id } : undefined;
	} catch (e: any) {
		console.warn("Error in get profile function", e);
		throw Error(e);
	}
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
	user: { id: string } & Partial<PrivateUserData>,
	sport: Profile["sport"],
	type: Profile["type"]
): Promise<{ id: string; userID: string } & Partial<Profile>> => {
	// get initial profile
	const profileData = await getProfile(user?.id, sport, type);

	// make a profile for this if it is not generated
	if (!profileData?.id) {
		const newProfile: { userID: string } & Omit<Profile, "id"> = {
			firstName: user?.firstName || null,
			lastName: user?.lastName || null,
			image: user?.image || null,
			userID: user.id,
			type,
			sport,
			rating: InitialRating,
			deltaRating: NullRating,
		};
		const docRef = await profileCollection.add(newProfile);
		return { id: docRef.id, ...newProfile };
	}
	return { ...profileData, userID: user.id, id: profileData.id };
};

export /**
 * Function will add a competition profile to the database
 *
 * @param {string} competitionID
 * @param {Competition["sport"]} sport
 * @param {string} profileID
 * @param {{
 * 		id?: Team["id"];
 * 		firstName?: Team["firstName"],
 * 		lastName?: Team["lastName"],
 * 	}} [teamInfo]
 * @return {*}
 */
const addCompetitionProfile = async (
	competitionID: string,
	sport: Competition["sport"],
	userID: string,
	teamInfo?: {
		id?: Team["id"];
		firstName?: Team["firstName"];
		lastName?: Team["lastName"];
	}
) => {
	try {
		// get initial profile
		const profileResponse = await fetch(
			`${BaseURL}/api/player/${userID}/${sport}`
		);
		const profileData: PlayerResponseType = await profileResponse.json();

		// add the profile to the competition
		const competitionProfile: CompetitionProfile = {
			firstName: profileData.firstName || null,
			lastName: profileData.lastName || null,
			image: profileData.image || null,
			userID: profileData.userID || userID,
			type: "player",
			sport,
			deltaRating: profileData.deltaRating,
			// current rating of the profile
			rating: profileData.rating || InitialRating,
			...profileData,
			teamID: teamInfo?.id || null,
			profileID: profileData.id,
			competitionID,
			competitionEndTimeISO: null,
			teamFirstName: teamInfo?.firstName || null,
			teamLastName: teamInfo?.lastName || null,
		};
		await competitionProfilesSubcollection(competitionID)
			.doc(profileData.id)
			.set(competitionProfile, { merge: true });

		// get the competition
		return competitionProfile;
	} catch (e: any) {
		console.warn("Error with adding competition profile", e);
		throw Error(e);
	}
};
