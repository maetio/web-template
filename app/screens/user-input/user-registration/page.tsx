import Link from "next/link";
import React from "react";

type UserRegistrationProps = {};

export const UserRegistration = (props: UserRegistrationProps) => {
	return (
		<div>
			<h1>User Registration</h1>
			<div>
				<Link href="/screens/team-registration/select-team">
					Team Registration{" "}
				</Link>
				<Link href="/screens/host-home">Host Dashboard</Link>
			</div>
		</div>
	);
};

export default UserRegistration;
