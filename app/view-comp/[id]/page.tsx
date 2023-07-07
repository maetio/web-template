import React from "react";
import { CompetitionsResponseType, PlayersResponseType } from "app/types/next-api";

export default async function ViewCompScreen({ params }: { params: { id: string } }) {
	// get competition data
	const competitionResponse = await fetch(`${process.env.NEXT_PUBLIC_PROJECT_DOMAIN}/api/competitions/${params.id}`);
	const competitions: CompetitionsResponseType = await competitionResponse.json();

	// get the competition teams
	const playersResponse = await fetch(`${process.env.NEXT_PUBLIC_PROJECT_DOMAIN}/api/players/${params.id}`);
	const players: PlayersResponseType = await playersResponse.json();

	// get the competition players
	const teams = [];

	return (
		<main>
			<h1>Competition Name: {competitions?.at(0)?.name}</h1>
			{teams.map((team) => (
				<h3 key={team.id}>{team.name}</h3>
			))}
			{players.map((player) => (
				<h3 key={player.id}>{player.firstName}</h3>
			))}
		</main>
	);
}
