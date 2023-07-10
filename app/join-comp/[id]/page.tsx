import React from "react";
import { CompetitionsResponseType } from "app/types/next-api";
import { getServerAuthUser } from "auth/server";
import { BaseURL } from "config/server";

export default async function ViewCompScreen({ params }: { params: { id: string } }) {
	// get competition data
	const competitionResponse = await fetch(`${BaseURL}/api/competitions/${params.id}`);
	const competitions: CompetitionsResponseType = await competitionResponse.json();
	const competitionData = competitions?.at(0);

	// get the user data
	const user = await getServerAuthUser();

	// get the profile data
	const playerProfile = await fetch(`${BaseURL}/api/player/${user?.id}/${competitionData?.sport}`);

	return (
		<main>
			<h1>Competition Name: {competitionData?.name}</h1>
			<br />
			
		</main>
	);
}
