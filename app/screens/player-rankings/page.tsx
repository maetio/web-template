import Link from "next/link";
import React from "react";

type Props = {}

const PlayerRankings = (props: Props) => {
	return (
		<div>
			<h1>Player Rankings</h1>
			<div>
				<Link href="/screens/view-player">View Player</Link>
			</div>
		</div>
	);
};

export default PlayerRankings;