"use client";

import React, { useEffect, useState } from "react";
import { GameCard } from "app/components/cards";
import { PaginationList } from "app/components/layout/pagination";
import { useQueryHook } from "utils/hook-template";
import { BaseURL } from "config/constants";
import { GamesResponseType } from "types/next-api";

const grabPaginatatedGames = async (compID: string) => {
	const gamesResponse = await fetch(`${BaseURL}/api/games/${compID}`);
	const games: GamesResponseType = await gamesResponse.json();

	return games;
};
export const GamesCardList = ({ compID }: { compID: string }) => {
	const [listData, setListData] = useState<GamesResponseType>([]);

	const [{ error, isLoading, data: games }, updateData] =
		useQueryHook(grabPaginatatedGames);

	useEffect(() => {
		updateData(compID);
	}, []);

	// useEffect(() => {
	// 	if (begID) {
	// 		setListData(listData.concat(data));
	// 	} else {
	// 		setListData(data);
	// 	}
	// }, [data]);

	return (
		<>
			{games && !isLoading ? (
				<ul role="list" className="">
					{games.length ? (
						games.map((game) => (
							<li key={game.id} className="mt-5 lg:pr-3">
								<GameCard game={game} />
							</li>
						))
					) : (
						<p className=" ml-2 mt-3 text-gray-600">No Games</p>
					)}
				</ul>
			) : (
				<p>loading...</p>
			)}
			{error && <p>{error}</p>}

			<PaginationList />
		</>
	);
};
