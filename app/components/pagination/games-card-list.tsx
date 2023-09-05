"use client";

import React, { useEffect, useState } from "react";
import { GameCard } from "app/components/cards";
import { PaginationList } from "app/components/layout/pagination";
import { useQueryHook } from "utils/hook-template";
import { BaseURL } from "config/constants";
import { GamesResponseType } from "types/next-api";

const grabPaginatatedGames = async ({
	compID,
	begID,
}: {
	compID: string;
	begID?: string;
}) => {
	if (begID) {
		const gamesResponse = await fetch(
			`${BaseURL}/api/games/${compID}/0/0/4/${begID}`
		);
		const games: GamesResponseType = await gamesResponse.json();

		return games;
	}
	const gamesResponse = await fetch(`${BaseURL}/api/games/${compID}/0/0/8`);
	const games: GamesResponseType = await gamesResponse.json();

	return games;
};
export const GamesCardList = ({
	compID,
	count,
}: {
	compID: string;
	count: number;
}) => {
	const [start, setStart] = useState(0);
	const [end, setEnd] = useState(4);
	const [begID, setBegID] = useState<string>();
	const [listData, setListData] = useState<GamesResponseType>([]);

	const handleForwardClick = () => {
		if (end >= listData.length) return;
		setStart(start + 5);
		setEnd(end + 5);
	};

	const handleBackClick = () => {
		if (start <= 0) return;
		setStart(start - 5);
		setEnd(end - 5);
	};

	const [{ error, isLoading, data: games }, updateData] =
		useQueryHook(grabPaginatatedGames);

	useEffect(() => {
		updateData({ compID });
	}, []);

	useEffect(() => {
		if (begID) {
			setListData(listData.concat(games));
		} else {
			setListData(games);
		}
	}, [games]);

	return (
		<>
			{listData && !isLoading ? (
				<ul role="list">
					{listData.length ? (
						listData.slice(start, end).map((game) => (
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

			<PaginationList
				totalListCount={count}
				forwardAction={handleForwardClick}
				backwardsAction={handleBackClick}
			/>
		</>
	);
};
