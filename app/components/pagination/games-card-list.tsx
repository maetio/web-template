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

		console.log("games from begin id", games);

		return games;
	}
	const gamesResponse = await fetch(`${BaseURL}/api/games/${compID}/0/0/8`);
	const games: GamesResponseType = await gamesResponse.json();

	return games;
};
export const GamesCardList = ({
	compID,
	count = 1,
}: {
	compID: string;
	count: number;
}) => {
	const [start, setStart] = useState(0);
	const [end, setEnd] = useState(4);
	const [listData, setListData] = useState<GamesResponseType>([]);

	const [{ error, data: games }, updateData] =
		useQueryHook(grabPaginatatedGames);

	const handleForwardClick = () => {
		const delta = listData.length - end;

		if (end >= listData.length) return;

		if (delta <= 4) {
			setStart(start + delta);
			setEnd(end + delta);
			updateData({ compID, begID: listData[listData.length - 1].id });
		} else {
			setStart(start + 4);
			setEnd(end + 4);
		}
	};

	const handleBackClick = () => {
		if (start <= 0) return;

		if (start < 4 && start > 0) {
			setStart(0);
			setEnd(4);
		} else {
			setStart(start - 4);
			setEnd(end - 4);
		}
	};

	useEffect(() => {
		updateData({ compID });
	}, [compID, updateData]);

	useEffect(() => {
		const handleGameChange = () => {
			if (games) {
				console.log(games.length);
				if (games.length <= 4) {
					setListData(listData.concat(games));
				} else {
					setListData(games);
				}
			}
		};

		handleGameChange();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [games]);

	useEffect(() => {
		console.log("list data", listData);
	}, [listData]);

	useEffect(() => {
		console.log("start", start);
		console.log("end", end);
	}, [start, end]);

	return (
		<>
			{listData ? (
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
				listCountLabel="Total Games:"
				forwardAction={handleForwardClick}
				backwardsAction={handleBackClick}
			/>
		</>
	);
};
