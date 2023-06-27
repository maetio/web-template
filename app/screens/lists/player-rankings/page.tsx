import Link from "next/link";
import React from "react";

// export interface PlayerRankingsProps = {};

export const PlayerRankings: React.FC<{}> = () => {
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
