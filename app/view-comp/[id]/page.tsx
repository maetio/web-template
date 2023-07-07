import React from "react";
import { CompetitionsResponseType } from "app/types/next-api";

export default async function ViewCompScreen({ params }: { params: { id: string } }) {
	// get competition data
	const competitionResponse = await fetch(`${process.env.NEXT_PUBLIC_PROJECT_DOMAIN}/api/competitions/${params.id}`);
	const competitions: CompetitionsResponseType = await competitionResponse.json();

	// get the competition teams
	const competitionTeams = [];

	// get the competition players
	const competitionPlayers = [];

	return (
		<main>
			<h1>Competition Name: {competitions?.at(0)?.name}</h1>
			{competitionTeams.map((team) => (
				<h3 key={team.id}>{team.name}</h3>
			))}
			{competitionPlayers.map((player) => (
				<h3 key={player.id}>{player.name}</h3>
			))}
		</main>
	);
}
