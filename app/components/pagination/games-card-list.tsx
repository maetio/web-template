"use client";

import React from "react";
import { GameCard } from "app/components/cards";
import { PaginationList } from "app/components/layout/pagination";

export const GamesCardList = ({ games }) => {
	return (
		<section className="rounded-2xl bg-white p-4">
			<h6 className="font-bold">Games</h6>
			<ul role="list" className="">
				{games.length ? (
					games.map((game) => (
						<li key={game.id} className="mt-5 lg:pr-3">
							<GameCard id={game.id} />
						</li>
					))
				) : (
					<p className=" ml-2 mt-3 text-gray-600">No Games</p>
				)}
			</ul>
			<PaginationList />
		</section>
	);
};
