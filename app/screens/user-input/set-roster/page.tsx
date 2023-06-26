import Link from "next/link";
import React from "react";

export type SetRosterProps = {};

export const SetRoster = (props: SetRosterProps) => {
	return (
		<div>
			<h1>Pay Entrance</h1>
			<div>
				<Link href="/screens/team-registration/success">Success</Link>
			</div>
		</div>
	);
};

export default SetRoster;
