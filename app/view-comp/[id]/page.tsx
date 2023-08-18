import React from "react";
import {
	CompProfilesResponseType,
	CompetitionsResponseType,
	GamesResponseType,
	PlayersResponseType,
} from "types/next-api";
import { BaseURL } from "config/constants";
import { getUserData } from "server-actions/users";
import { ActionButton } from "app/components/action-button";
import { CompDisplayData } from "app/components/comp-data";
import { NextImage } from "app/components/image";

import AltPlayerCard from "app/components/cards/alt-player-card";
import { GameCard } from "app/components/cards/game-card";
import { VictoryBarGraph } from "app/components/data-display/victory-bargraph";
import { filterPlayerData } from "utils/format";

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
					<NextImage size={400} src={competitionData?.image} />
				</div>
				<div className=" mt-10 flex flex-col flex-wrap self-center lg:mx-5 lg:mt-0">
					<CompDisplayData
						type={competitionData?.type || "session"}
						sport={competitionData?.sport || "pickleball"}
						startTimeISO={competitionData?.startTimeISO}
						endTimeISO={competitionData?.endTimeISO}
						location={competitionData?.location}
					/>

					<h1 className="my-3 flex flex-wrap text-5xl font-bold md:text-6xl">
						{competitionData?.name}
					</h1>

					<p className="flex flex-wrap xl:hidden">
						{competitionData?.description ||
							"ged. It was popularised in the 1960s with the release ged. It was popularised in the 1960s with the release ged. It was popularised in the 1960s with the release ged. It was popularised in the 1960s with the release"}
					</p>

					<div className="flex flex-row flex-wrap py-4">
						{compPlayer?.rating?.displayRating ? (
							<div className="flex flex-row">
								<NextImage
									size={50}
									src={compPlayer.image}
									alt={compPlayer.firstName}
								/>
								<h3 className="ml-3 self-center font-semibold">
									You are ranked{" "}
									{getRankString(
										players.findIndex(
											(profile) =>
												profile.id === compPlayer.id
										)
									)}{" "}
									of {players.length} total players.
								</h3>
							</div>
						) : (
							<ActionButton
								className="w-auto px-12"
								referRoute={
									user?.id
										? `/join-comp/${competitionData?.id}`
										: `/comp-login/${competitionData?.id}`
								}
								title="Join Competition"
								colorVariant="indigo"
							/>
						)}
					</div>
				</div>
			</section>

			{/* main content of the page */}
			<section className="min-w-full lg:flex lg:justify-between">
				{/* games data */}
				<section className="w-full">
					<div className="hidden xl:inline">
						<h3 className="text-3xl font-bold">Description</h3>
						<p className="wrap mr-14 flex flex-wrap">
							{competitionData?.description ||
								"ged. It was popularised in the 1960s with the release ged. It was popularised in the 1960s with the release ged. It was popularised in the 1960s with the release ged. It was popularised in the 1960s with the release"}
						</p>
					</div>

					{/* players and graph on SMALL screens  */}
					<section className="lg:hidden">
						<div>
							<h3 className="text-3xl font-bold">Players</h3>
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

						<div className="border-gray-900/7 top-8 col-span-6 h-96 rounded-lg border bg-white lg:sticky lg:top-4 lg:col-span-2">
							<ul
								role="list"
								className="sticky top-0 h-96 divide-y divide-gray-100 overflow-y-auto"
							>
								{players.map((player, rank) => (
									<li key={player.id} className="px-5">
										<AltPlayerCard
											key={player.id}
											player={player}
											ranking={rank}
										/>
									</li>
								))}
							</ul>
						</div>
					</section>

					<h3 className="mt-10 text-3xl font-bold lg:mt-0 xl:mt-5">
						Games
					</h3>
					<ul role="list" className="">
						{games.map((game) => (
							<li key={game.id} className="lg:pr-3">
								<GameCard id={game.id} />
							</li>
						))}
					</ul>
				</section>

				{/* sidebar on LARGE screens */}
				<aside className="top-24 ml-3 hidden h-[82vh] self-start rounded-lg bg-white p-4 lg:sticky lg:inline">
					<div className="flex h-full flex-col">
						<div>
							<h3 className="text-3xl font-bold">Players</h3>
							<VictoryBarGraph
								className="w-[400px]"
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
						<div className="mt-4 flex-grow overflow-y-auto">
							<ul role="list">
								{players.map((player, rank) => (
									<li key={player.id} className="px-3">
										<AltPlayerCard
											key={player.id}
											player={player}
											ranking={rank}
										/>
									</li>
								))}
							</ul>
						</div>
					</div>
				</aside>
			</section>
		</main>
	);
}
