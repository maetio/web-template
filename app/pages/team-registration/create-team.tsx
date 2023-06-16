import Link from "next/link";
import React from "react";

type Props = {}

const CreateTeam = (props: Props) => {
	return (
		<div>
            Create Team
			<Link href="/join-team">Join Team</Link>
		</div>
	);
};

export default CreateTeam;