import Link from "next/link";
import React from "react";

type Props = {}

const ViewCompetition = (props: Props) => {
	return (
		<div>
			<h1>View Competition</h1>
			<Link href="/screens/team-rankings">Team Rankings</Link>
		</div>
	);
};

export default ViewCompetition;