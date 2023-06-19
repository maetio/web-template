import Link from "next/link";
import React from "react";

type Props = {}

const Success = (props: Props) => {
	return (
		<div>
			<h1>Success</h1>
			<div>
				<h2>Download Maet App in App Store</h2>
			</div>
			<Link href="/screens/view-competition">View Competitions</Link>
		</div>
	);
};

export default Success;