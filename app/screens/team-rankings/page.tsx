import Link from "next/link";
import React from "react";

type Props = {}

const TeamRankings = (props: Props) => {
	return (
		<div>
			<h1>Team Rankings</h1>
			<Link href="/screens/view-team"></Link>
		</div>
	);
};

export default TeamRankings;