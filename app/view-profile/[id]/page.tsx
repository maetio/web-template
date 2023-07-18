import { BaseURL } from "config/constants";
import React from "react";
import { Competition } from "types/competition";
import { PlayerResponseType } from "types/next-api";

/**
 * View profile screen will render the data with the profile
 *
 * @export
 * @param {{
 * 	params: { id: string };
 * }} {
 * 	params,
 * }
 * @return {*} 
 */
export default async function ViewProfileScreen({
	params,
}: {
	params: { userID: string; sport: Competition["sport"] };
}) {
	// fetch call to get the user's player profile
	const profileResponse = await fetch(
		`${BaseURL}/api/player/${params.userID}/${params.sport}`
	);
	const profileData: PlayerResponseType = await profileResponse.json();

	// fetch the game profiles for the profile

	return (
		<main className="mx-10">
			<h1>{profileData.firstName} {profileData.lastName}</h1>
			<h2>{profileData.rating?.displayRating}</h2>
		</main>
	);
}
