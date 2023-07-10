import React from "react";
import { CompetitionsResponseType, PlayersResponseType, TeamsResponseType } from "app/types/next-api";
import { BaseURL } from "config/server";

export default async function ViewCompScreen({ params }: { params: { id: string } }) {
	// get competition data
	const competitionResponse = await fetch(`${BaseURL}/api/competitions/${params.id}`);
	const competitions: CompetitionsResponseType = await competitionResponse.json();

	// get the competition players
	const playersResponse = await fetch(`${BaseURL}/api/players/${params.id}`);
	const players: PlayersResponseType = await playersResponse.json();

	// get the competition teams
	const teamsResponse = await fetch(`${BaseURL}/api/teams/${params.id}`);
	const teams: TeamsResponseType = await teamsResponse.json();

	return (
		<main>
			<h1>Competition Name: {competitions?.at(0)?.name}</h1>
			<br />
			{teams.map((team) => (
				<h3 key={team.id}>{team.firstName} {team.lastName}</h3>
			))}
			<br />
			{players.map((player) => (
				<h3 key={player.id}>{player.firstName} {player.lastName}</h3>
			))}
		</main>
	);
}
