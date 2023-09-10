"use client";

import React, { useState } from "react";
import { VictoryBarGraph } from "app/components/data-display/victory-bargraph";
import { PlayersResponseType } from "types/next-api";
import { FaLock } from "react-icons/fa";
import { filterPlayerData } from "utils/format";
import { PlayerRatingCard } from "app/components/cards/player-rating-card";
import { PaginationList } from "../layout/pagination";

interface PlayerCardListParams {
	players: PlayersResponseType;
	blur?: boolean;
}

export const PlayerCardList: React.FC<PlayerCardListParams> = ({
	players,
	blur,
}) => {
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

			<div className="relative w-full rounded-lg bg-white">
				<ul
					role="list"
					className={`divide-y divide-gray-100 ${
						blur && "pointer-events-none blur-sm"
					}`}
				>
					{players.slice(start, end).map((player, rank) => (
						<li key={player.id} className="my-[5px] px-3">
							<PlayerRatingCard
								key={player.id}
								player={player}
								ranking={rank}
								blur={blur}
							/>
						</li>
					))}
				</ul>
				{blur && (
					<div className="absolute left-[40%] top-[50%] z-10 mx-auto text-center">
						<div className="flex flex-col items-center gap-2.5">
							<FaLock className="h-5 w-5" />
							<p className="w-[178px] text-center text-[15px] font-medium leading-tight tracking-tight text-black">
								Register to view players
							</p>
							<button> click me</button>
						</div>
					</div>
				)}
			</div>

			<PaginationList
				className="border-t border-gray-200"
				listCountLabel="Total Players:"
				forwardAction={handleForwardClick}
				backwardsAction={handleBackClick}
				totalListCount={players.length}
			/>
		</>
	);
};
