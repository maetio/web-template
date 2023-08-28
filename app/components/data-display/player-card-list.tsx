import React, { Suspense } from "react";
import { filterPlayerData } from "utils/format";
import { PlayersResponseType } from "types/next-api";
import { BaseURL } from "config/constants";
import { VictoryBarGraph } from "./victory-bargraph";
import { AltPlayerCard } from "../cards/alt-player-card";

export async function PlayerCardList({
	aside,
	compID,
}: {
	aside: boolean;
	compID: string;
}) {
	// get the competition players
	const playersResponse = await fetch(`${BaseURL}/api/players/${compID}`);
	const players: PlayersResponseType = await playersResponse.json();

	// filter the player data for victory to use
	const filteredPlayerData = filterPlayerData(players);

	return (
		<Suspense fallback={<p>loading...</p>}>
			{aside ? (
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
			) : (
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
			)}
		</Suspense>
	);
}
