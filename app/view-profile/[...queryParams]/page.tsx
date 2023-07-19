import React from "react";
import { BaseURL } from "config/constants";
import { GameProfilesResponseType, PlayerResponseType } from "types/next-api";

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
	params: { queryParams: Array<string | undefined> };
}) {
	// get the parameters from the query
	const [userID, sport] = params.queryParams;

	// fetch call to get the user's player profile
	const profileResponse = await fetch(
		`${BaseURL}/api/player/${userID}/${sport}`
	);
	const profileData: PlayerResponseType = await profileResponse.json();

	// fetch the game profiles for the profile
	const gameProfilesResponse = await fetch(
		`${BaseURL}/api/game-profiles/${profileData.id}`
	);
	const gameProfiles: GameProfilesResponseType =
		await gameProfilesResponse.json();

	return (
		<main className="mx-10">
			<h1>
				{profileData.firstName} {profileData.lastName}
			</h1>
			<h2>{profileData.rating?.displayRating}</h2>
			{gameProfiles.map((gameProf) => (
				<div key={gameProf.id}>
					<br />
					<h3>Game id: {gameProf.gameID}</h3>
					<h3>Rating: {gameProf.rating?.displayRating}</h3>
					<h3>
						Change:{" "}
						{gameProf.deltaRating?.displayRating &&
						gameProf.deltaRating?.displayRating > 0
							? "+"
							: ""}
						{gameProf.deltaRating?.displayRating}
					</h3>
					<br />
				</div>
			))}
		</main>
	);
}
