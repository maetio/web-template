import React from "react";
import {
	CompProfilesResponseType,
	CompetitionsResponseType,
	GamesResponseType,
	PlayerResponseType,
	PlayersResponseType,
} from "types/next-api";
import { BaseURL } from "config/constants";
import { getUserData } from "server-actions/users";
// import { ActionButton } from "app/components/action-button";
import { CompDisplayData } from "app/components/comp-data";
import { NextImage } from "app/components/image";

import { PlayerCard } from "app/components/cards/player-card";
import { GameCard } from "app/components/cards/game-card";
import { VictoryBarGraph } from "app/components/data-display/victory-bargraph";
import { filterPlayerData } from "utils/format";
import { RatedCompetitionCard } from "app/components/cards";

/**
 * Function will display the competition to the user
 *
 * @export
 * @param {{
 * 	params: { id: string };
 * }} {
 * 	params,
 * }
 * @return {*}
 */
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

	// get the competition games
	const gamesResponse = await fetch(`${BaseURL}/api/games/${params.id}`);
	const games: GamesResponseType = await gamesResponse.json();

	// get if the player has joined the competition
	const compPlayerResponse = await fetch(
		`${BaseURL}/api/comp-player/${params.id}/${user?.id}`
	);
	const compPlayer: CompProfilesResponseType =
		await compPlayerResponse.json();

	// get host profile data
	const profileResponse = await fetch(
		`${BaseURL}/api/user-data/${competitionData?.hostID}`
	);
	const hostData: PlayerResponseType = await profileResponse.json();

	// set rank string
	const getRankString = (rank: number) => {
		if (rank === 0) return "1st";
		if (rank === 1) return "2nd";
		if (rank === 2) return "3rd";
		if (rank > 2) return `${rank + 1}th`;
		return "Not Ranked";
	};

	// filter the player data for victory to use
	const filteredPlayerData = filterPlayerData(players);

	return (
		<main className="container min-w-full px-0 sm:px-2">
			{/* Competition image and name banner */}
			<section className="flex flex-col flex-wrap pb-12 pt-4 md:flex-row lg:flex-nowrap lg:pt-12">
				<div className="self-center">
					<NextImage
						size={400}
						src={competitionData?.image}
						alt={`${competitionData?.name} profile`}
					/>
				</div>
				{/* name and host section */}
				<section className="flex w-full flex-col flex-wrap self-center rounded-2xl bg-white p-4">
					<h1 className="flex flex-wrap text-3xl font-bold md:text-4xl">
						{competitionData?.name}
					</h1>
					<PlayerCard host player={hostData} />
				</section>
			</section>

			<RatedCompetitionCard />

			<section className="rounded-2xl bg-white p-4">
				<h6 className="font-bold">Competition Info</h6>
				<CompDisplayData
					className="mt-5"
					type={competitionData?.type || "session"}
					sport={competitionData?.sport || "pickleball"}
					startTimeISO={competitionData?.startTimeISO}
					endTimeISO={competitionData?.endTimeISO}
					location={competitionData?.location}
				/>
			</section>

			{/* main content of the page */}
			<section className="mt-2.5 flex min-w-full flex-col gap-2.5">
				{/* description section */}
				<section className="rounded-2xl bg-white p-4">
					<h6 className="font-bold">Description</h6>
					<p className="wrap mt-5 flex flex-wrap">
						{competitionData?.description ||
							"ged. It was popularised in the 1960s with the release ged. It was popularised in the 1960s with the release ged. It was popularised in the 1960s with the release ged. It was popularised in the 1960s with the release"}
					</p>
				</section>
				{/* graph section */}
				<section className="rounded-2xl bg-white p-4">
					<div>
						<h6 className="font-bold">Players</h6>
						<VictoryBarGraph
							className="w-full"
							data={filteredPlayerData}
							tickLabels={[
								"<1750",
								"1751-1850",
								"1851-1950",
								"1951-2050",
								">2050",
							]}
						/>
					</div>

					<div className="top-8 col-span-6 h-96 rounded-lg  bg-white lg:sticky lg:top-4 lg:col-span-2">
						<ul
							role="list"
							className="sticky top-0 h-96 divide-y divide-gray-100 overflow-y-auto"
						>
							{players.map((player, rank) => (
								<li key={player.id} className="px-5">
									<PlayerCard
										key={player.id}
										player={player}
										ranking={rank}
									/>
								</li>
							))}
						</ul>
					</div>
				</section>
				{/* game section */}
				<section className="rounded-2xl bg-white p-4">
					<h6 className="font-bold">Games</h6>
					<ul role="list" className="">
						{games.length ? (
							games.map((game) => (
								<li key={game.id} className="lg:pr-3">
									<GameCard id={game.id} />
								</li>
							))
						) : (
							<p className=" ml-2 mt-3 text-gray-600">No Games</p>
						)}
					</ul>
				</section>
			</section>
		</main>
	);
}
