import React from "react";
import { CompetitionsResponseType } from "app/types/next-api";

export default async function ViewCompScreen({ params }: { params: { id: string } }) {
	// get competition data
	const competitionResponse = await fetch(`${process.env.NEXT_PUBLIC_PROJECT_DOMAIN}/api/competitions/${params.id}`);
	const competitions: CompetitionsResponseType = await competitionResponse.json();

	// get the profile data

	return (
		<main>
			<h1>Competition Name: {competitions?.at(0)?.name}</h1>
			<br />
			
		</main>
	);
}
