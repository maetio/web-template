"use client";

import React, { useState } from "react";
import { VictoryBarGraph } from "app/components/data-display/victory-bargraph";
import { PlayersResponseType } from "types/next-api";
import { filterPlayerData } from "utils/format";
import { PlayerCard } from "../cards";
import { PaginationList } from "../layout/pagination";

interface PlayerCardListParams {
	players: PlayersResponseType;
}

export const PlayerCardList: React.FC<PlayerCardListParams> = ({ players }) => {
	const filteredPlayerData = filterPlayerData(players);

	const [start, setStart] = useState<number>(0);
	const [end, setEnd] = useState<number>(5);

	const handleForwardClick = () => {
		const delta = players.length - end;

		if (end >= players.length) return;

		if (delta < 5) {
			setStart(start + delta);
			setEnd(end + delta);
		} else {
			setStart(start + 5);
			setEnd(end + 5);
		}
	};

	const handleBackClick = () => {
		if (start <= 0) return;

		if (start < 5 && start > 0) {
			setStart(0);
			setEnd(5);
		} else {
			setStart(start - 5);
			setEnd(end - 5);
		}
	};

	return (
		<>
			<div className="flex w-full flex-col">
				<VictoryBarGraph
					className="flex w-3/4 self-center"
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

			<div className=" col-span-6 rounded-lg  bg-white lg:top-4 lg:col-span-2">
				<ul role="list" className="divide-y divide-gray-100 ">
					{players.slice(start, end).map((player, rank) => (
						<li key={player.id} className="my-[5px] px-5">
							<PlayerCard
								key={player.id}
								player={player}
								ranking={rank}
							/>
						</li>
					))}
				</ul>
			</div>
			<PaginationList
				forwardAction={handleForwardClick}
				backwardsAction={handleBackClick}
				totalListCount={players.length}
				itemsPerList={5}
			/>
		</>
	);
};
