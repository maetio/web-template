import Link from "next/link";
import React from "react";

type Props = {};

const PayEntranceFee = (props: Props) => {
	return (
		<div>
			<h1>Pay Entrance</h1>
			<div>
				<Link href="/screens/team-registration/success">Success</Link>
			</div>
		</div>
	);
};

export default PayEntranceFee;
