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
import { GameCard } from "app/components/cards/alt-game-card";
import { VictoryTest } from "app/components/data-display/victory-test";

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

	const filterPlayerData = () => {
		const victoryData: number[] = [];

		players.forEach((player) => {
			if (player.rating?.displayRating)
				victoryData.push(player.rating?.displayRating);
		});

		console.log("victory data", victoryData);

		const binEdges = [0, 1750, 1850, 1950, 2050, 3500];

		const histogramData = binEdges.map((edge, index) => ({
			x: index,
			y: victoryData.filter(
				(rating) => rating >= edge && rating < binEdges[index + 1]
			).length,
		}));

		console.log("histogram data", histogramData);

		return histogramData;
	};

	const filterDatathing = filterPlayerData();

	return (
		<main className="container min-w-full px-0 sm:px-2 2xl:mx-auto">
			<div>
				<div className="flex flex-col flex-wrap pb-12 pt-4 md:flex-row lg:flex-nowrap lg:pt-12">
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
				</div>

				{/* main */}
				<section className="min-w-full lg:flex lg:justify-between">
					<div className="w-full">
						{/* description */}
						<section className="hidden xl:inline">
							<h3 className="text-3xl font-bold">Description</h3>
							<p className="wrap mr-14 flex flex-wrap">
								{competitionData?.description ||
									"ged. It was popularised in the 1960s with the release ged. It was popularised in the 1960s with the release ged. It was popularised in the 1960s with the release ged. It was popularised in the 1960s with the release"}
							</p>
						</section>

						{/* description end */}
						{/* players and graph */}
						<div className="lg:hidden">
							<section>
								<h3 className="text-3xl font-bold">Players</h3>
								<VictoryTest
									className="w-full"
									data={filterDatathing}
									tickLabels={[
										"<1750",
										"1751-1850",
										"1851-1950",
										"1951-2050",
										">2050",
									]}
								/>
							</section>

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
						</div>
						{/* end of players and graph */}

						<h3 className="mt-10 text-3xl font-bold lg:mt-0 xl:mt-5">
							Games
						</h3>
						<ul role="list" className="">
							{games.map((game) => (
								<li key={game.id} className="py-1 lg:pr-3">
									<GameCard id={game.id} />
								</li>
							))}
						</ul>
					</div>

					{/* sidebar on large screens */}
					<aside className="top-28 ml-3 p-4 hidden bg-white rounded-lg self-start lg:sticky lg:inline">
						<div>
							<h3 className="text-3xl font-bold">Players</h3>
							{/* <div className="w-100 h-[300px] bg-red-600">chart</div> */}
							<VictoryTest
								className="w-[400px]"
								data={filterDatathing}
								tickLabels={[
									"<1750",
									"1751-1850",
									"1851-1950",
									"1951-2050",
									">2050",
								]}
							/>
						</div>

						<div className="border-gray-900/7 top-8 h-[50vh] rounded-lg border bg-white lg:sticky lg:top-4">
							<ul
								role="list"
								className="sticky top-0 h-[50vh] divide-y divide-gray-100 overflow-y-auto"
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
					</aside>
				</section>
			</div>
		</main>
	);
}
