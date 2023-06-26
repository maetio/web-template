import Link from "next/link";
import React from "react";

export type HostHomeProps = {};

export const HostHome = (props: HostHomeProps) => {
	return (
		<div>
			<h1>Host Home</h1>
			<div>
				<Link href="/screens/view-competition">View Competition </Link>
				<Link href="/screens/create-competition">
					Create Competition
				</Link>
			</div>
		</div>
	);
};

export default HostHome;
