import Link from "next/link";
import React from "react";

type Props = {}

const GamesList = (props: Props) => {
	return (
		<div>
			<h1>Games List</h1>
			<div>
				<Link href="/screens/view-game"></Link>
				<Link href="/screens/edit-game"></Link>
			</div>
		</div>
	);
};

export default GamesList;