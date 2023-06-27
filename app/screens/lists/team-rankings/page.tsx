import Link from "next/link";
import React from "react";

// export interface TeamRankingsProps = {};

export const TeamRankings: React.FC<{}> = () => {
	return (
		<div>
			<h1>Team Rankings</h1>
			<Link href="/screens/view-team"></Link>
		</div>
	);
};

export default TeamRankings;
