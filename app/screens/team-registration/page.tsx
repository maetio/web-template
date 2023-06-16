import Link from "next/link";
import React from "react";

type Props = {}

const Page = (props: Props) => {
	return (
		<div>
            Page
			<Link href="/screens/team-registration/create-team">Create Team</Link>
		</div>
	);
};

export default Page;