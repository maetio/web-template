import Link from "next/link";
import React from "react";

// export interface ViewTeamProps = {};

export const ViewTeam: React.FC<{}> = () => {
	return (
		<div>
			<h1>View Team</h1>
			<div>
				<Link href="/screens/edit-team"></Link>
			</div>
		</div>
	);
};

export default ViewTeam;
