import React from "react";
import {
	CompetitionsResponseType,
	PlayersResponseType,
	TeamsResponseType,
} from "types/next-api";
import { BaseURL } from "config/constants";
import Link from "next/link";
import { getServerAuthUser } from "auth/server";
import { CompetitionCard, PlayerCard, TeamCard } from "app/components/cards";

export default async function ViewCompScreen({
	params,
}: {
	params: { id: string };
}) {
	// get the user data
	const user = await getServerAuthUser();

	// get competition data
	const competitionResponse = await fetch(
		`${BaseURL}/api/competitions/${params.id}`
	);
	const competitions: CompetitionsResponseType =
		await competitionResponse.json();
	const competitionData = competitions.at(0);

	// get the competition players
	const playersResponse = await fetch(`${BaseURL}/api/players/${params.id}`);
	const players: PlayersResponseType = await playersResponse.json();

	// get the competition teams
	const teamsResponse = await fetch(`${BaseURL}/api/teams/${params.id}`);
	const teams: TeamsResponseType = await teamsResponse.json();

	console.log(user?.id);

	return (
		<main>
			<h1>Competition Name: {competitionData?.name}</h1>
			<br />
			<br />
			<Link
				href={user?.id ? `/join-comp/${competitionData?.id}` : "/login"}
			>
				<h2>Join Competition</h2>
			</Link>
			<br />
			<br />
			{teams.map((team) => (
				<TeamCard
					key={team.id}
					name={team.lastName}
					score={team.averagePlayerRating?.displayRating}
				/>
			))}
			<br />
			{players.map((player) => (
				<PlayerCard
					key={player.id}
					name={`${player.firstName} ${player.lastName}`}
					score={player.rating?.displayRating}
				/>
			))}
			<CompetitionCard />
		</main>
	);
}
