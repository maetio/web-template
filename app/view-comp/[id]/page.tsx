import React from "react";
import {
	CompProfilesResponseType,
	CompetitionsResponseType,
	PlayersResponseType,
	TeamsResponseType,
} from "types/next-api";
import { BaseURL } from "config/constants";
import Link from "next/link";
import { getUserData } from "server-actions/users";
import { PlayerCard, TeamCard } from "app/components/cards";

export default async function ViewCompScreen({
	params,
}: {
	params: { id: string };
}) {
	// get the user data
	const user = await getUserData();

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

	// get if the player has joined the competition
	const compPlayerResponse = await fetch(
		`${BaseURL}/api/comp-player/${params.id}/${user?.id}`
	);
	const compPlayer: CompProfilesResponseType =
		await compPlayerResponse.json();

	return (
		<main>
			<h1>Competition Name: {competitionData?.name}</h1>
			<br />
			<br />
			{compPlayer.profileID ? (
				<h2>
					In competition with rating{" "}
					{compPlayer.rating?.displayRating}
				</h2>
			) : (
				<Link
					href={
						user?.id
							? `/join-comp/${competitionData?.id}`
							: `/comp-login/${competitionData?.id}`
					}
				>
					<h2>Join Competition</h2>
				</Link>
			)}
			<p>
				Player logged in: {user?.firstName} {user?.lastName}
			</p>
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
		</main>
	);
}
