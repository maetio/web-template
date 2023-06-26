import Link from "next/link";
import React from "react";

export type ViewGameProps = {};

export const ViewGame = (props: ViewGameProps) => {
	return (
		<div>
			<h1>View Game</h1>
			<div>
				<Link href="/screens/edit-game">Edit Game</Link>
			</div>
		</div>
	);
};

export default ViewGame;
