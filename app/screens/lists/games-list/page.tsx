import Link from "next/link";
import React from "react";

export type Props = {};

export const GamesList = (props: Props) => {
	return (
		<div>
			<h1>Games List</h1>
			<div>
				<Link href="/screens/view-game">View Game</Link>
			</div>
		</div>
	);
};

export default GamesList;
