import React from "react";
import { CompetitionsResponseType, PlayersResponseType, TeamsResponseType } from "types/next-api";
import { BaseURL } from "config/constants";
import Link from "next/link";
import { getUserData } from "server-actions/users";

export default async function ViewCompScreen({ params }: { params: { id: string } }) {
	// get the user data
	const user = await getUserData();

	// get competition data
	const competitionResponse = await fetch(`${BaseURL}/api/competitions/${params.id}`);
	const competitions: CompetitionsResponseType = await competitionResponse.json();
	const competitionData = competitions.at(0);

	// get the competition players
	const playersResponse = await fetch(`${BaseURL}/api/players/${params.id}`);
	const players: PlayersResponseType = await playersResponse.json();

	// get the competition teams
	const teamsResponse = await fetch(`${BaseURL}/api/teams/${params.id}`);
	const teams: TeamsResponseType = await teamsResponse.json();

	return (
		<main>
			<h1>Competition Name: {competitionData?.name}</h1>
			<br />
			<br />
			<Link href={user?.id ? `/join-comp/${competitionData?.id}` : `/comp-login/${competitionData?.id}`}>
				<h2>Join Competition</h2>
			</Link>
			<br />
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
