import React from "react";
import {
	CompProfilesResponseType,
	CompetitionsResponseType,
	PlayersResponseType,
} from "types/next-api";
import { BaseURL } from "config/constants";
import Link from "next/link";
import { getUserData } from "server-actions/users";
// import { PlayerCard, TeamCard } from "app/components/cards";
import { MaetIcon } from "app/components/icons";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

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
	// const teamsResponse = await fetch(`${BaseURL}/api/teams/${params.id}`);
	// const teams: TeamsResponseType = await teamsResponse.json();

	// get if the player has joined the competition
	const compPlayerResponse = await fetch(
		`${BaseURL}/api/comp-player/${params.id}/${user?.id}`
	);
	const compPlayer: CompProfilesResponseType =
		await compPlayerResponse.json();

	return (
		<main className="mx-10">
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
			<ul role="list" className="divide-y divide-gray-100">
				{players.map((player, rank) => (
					<li key={player.id} className="flex justify-between gap-x-6 py-5">
						<div className="flex gap-x-4 justify-center align-center">
							<h1 className="text-xl font-bold flex-none">{rank + 1}</h1>
							<img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={player.image} alt="" />
							<div className="min-w-0 flex-auto">
								<p className="text-sm font-bold leading-6 text-gray-900">{player.firstName} {player.lastName}</p>
								<p className="mt-1 truncate text-xs leading-5 text-gray-500">{player.type}</p>
							</div>
						</div>

						<div
							className="relative"
						>
							<dt>
								<div className="absolute rounded-md p-3">
									<MaetIcon size={10} />
								</div>
								<p className="ml-16 truncate text-sm font-medium text-gray-500">Rating</p>
							</dt>
							<dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
								<p className="text-2xl font-semibold text-gray-900">{Math.round(player.rating?.displayRating || 100)}</p>
								<p
									className={classNames(
										player?.deltaRating?.displayRating && player?.deltaRating?.displayRating >= 0 ? "text-green-600" : "text-red-600",
										"ml-2 flex items-baseline text-sm font-semibold"
									)}
								>
									{player?.deltaRating?.displayRating && player?.deltaRating?.displayRating >= 0 ? "+" : ""}{Math.round(player?.deltaRating?.displayRating || 0)}
								</p>
							</dd>
						</div>
					</li>
				))}
			</ul>
			{/* <br />
			<br />
			{teams.map((team) => (
				<TeamCard
					key={team.id}
					name={team.lastName}
					score={team.averagePlayerRating?.displayRating}
					ranking={1}
					image={team.image}
				/>
			))}
			<br />
			{players.map((player) => (
				<PlayerCard
					key={player.id}
					name={`${player.firstName} ${player.lastName}`}
					score={player.rating?.displayRating}
					ranking={2}
					image={player.image}
				/>
			))} */}
		</main>
	);
}
