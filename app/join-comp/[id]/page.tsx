import React from "react";
import { CompetitionsResponseType, PlayerResponseType } from "types/next-api";
import { BaseURL } from "config/constants";
import { getUserData } from "server-actions/users";
import { getOrCreateProfile } from "server-actions/profiles";

export default async function JoinCompScreen({ params }: { params: { id: string } }) {
	// get competition data
	const competitionResponse = await fetch(`${BaseURL}/api/competitions/${params.id}`);
	const competitions: CompetitionsResponseType = await competitionResponse.json();
	const competitionData = competitions?.at(0);

	// get the profile data
	const user = await getUserData();

	// get the profile data
	const playerResponse = await fetch(`${BaseURL}/api/player/${user?.id}/${competitionData?.sport}`);
	const playerProfile: PlayerResponseType = await playerResponse.json();

	// if not profile data, then create a new profile
	const profileData = playerProfile.firstName ? playerProfile : await getOrCreateProfile(user, competitionData?.sport || "basketball", "player");

	return (
		<main>
			<h1>Competition Name: {competitionData?.name}</h1>
			<br />
			<h3>Join the competition as {profileData.firstName} {profileData.lastName}</h3>
			<h3>Rating: {profileData.rating?.displayRating}</h3>
			<h3>Sport: {profileData.sport}</h3>
		</main>
	);
}
