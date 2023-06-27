import Link from "next/link";
import React from "react";

// export interface CreateCompetitionProps = {};

export const CreateCompetition: React.FC<{}> = () => {
	return (
		<div>
			<h1>Create Competition Page</h1>
			<div>
				<Link href="/screens/view-competition">View Competitions</Link>
			</div>
		</div>
	);
};

export default CreateCompetition;
