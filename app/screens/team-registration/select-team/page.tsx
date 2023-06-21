import Link from "next/link";
import React from "react";

type Props = {}

const SelectTeam = (props: Props) => {
	return (
		<div>
			<h1>
			Select Team Page
			</h1>
			<div>
				<Link href="/screens/team-registration/join-team">Join Team </Link>
				<Link href="/screens/team-registration/create-team">Create Team</Link>

			</div>
		</div>
	);
};

export default SelectTeam;