import Link from "next/link";
import React from "react";

export type TeamRankingsProps = {};

export const TeamRankings = (props: TeamRankingsProps) => {
	return (
		<div>
			<h1>Team Rankings</h1>
			<Link href="/screens/view-team"></Link>
		</div>
	);
};

export default TeamRankings;
