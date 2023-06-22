import Link from "next/link";
import React from "react";

type Props = {};

const CreateTeam = (props: Props) => {
	return (
		<div>
			<h1>Create Team</h1>
			<div>
				<Link href="/screens/team-registration/set-roster">
					Set Roster
				</Link>
			</div>
		</div>
	);
};

export default CreateTeam;
