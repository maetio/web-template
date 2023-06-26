import Link from "next/link";
import React from "react";

type CreateCompetitionProps = {};

export const CreateCompetition = (props: CreateCompetitionProps) => {
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
