import React, { Suspense } from "react";
import { GamesResponseType } from "types/next-api";
import { GameCard } from "app/components/cards";
import { BaseURL } from "config/constants";

export async function GamesCardList({ thing }: { thing: string }) {
	const gamesResponse = await fetch(`${BaseURL}/api/games/${thing}`);
	const games: GamesResponseType = await gamesResponse.json();
	return (
		<Suspense fallback={<p>loading....</p>}>
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
		</Suspense>
	);
}
