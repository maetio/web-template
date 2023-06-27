import Link from "next/link";
import React from "react";

// export interface HostHomeProps = {};

export const HostHome: React.FC<{}> = () => {
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
