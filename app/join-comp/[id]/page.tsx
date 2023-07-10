import React from "react";
import { CompetitionsResponseType, PlayerResponseType } from "../../../types/next-api";
import { BaseURL } from "config/constants";
import { getUserData } from "server-actions/users";

export default async function ViewCompScreen({ params }: { params: { id: string } }) {
	// get competition data
	const competitionResponse = await fetch(`${BaseURL}/api/competitions/${params.id}`);
	const competitions: CompetitionsResponseType = await competitionResponse.json();
	const competitionData = competitions?.at(0);

	// get the user data
	const user = await getUserData();

	// get the profile data
	const playerResponse = await fetch(`${BaseURL}/api/player/${user?.id}/${competitionData?.sport}`);
	const playerProfile: PlayerResponseType = await playerResponse.json();
	console.log(user);

	return (
		<main>
			<h1>Competition Name: {competitionData?.name}</h1>
			<br />
			<h3>Join the competition as {user?.firstName}?</h3>
		</main>
	);
}
