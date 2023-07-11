"use client";

import React from "react";
import Link from "next/link";
import { useAuthContext } from "auth/auth-context-provider";

export /**
 * Will have the home screen render
 *
 * @return {*}
 */
const ProfileButton = () => {
	// get the user context
	const userData = useAuthContext();

	return (
		<div>
			{userData?.id ? (
				<Link href="/profile">
					{userData?.firstName} {userData?.lastName}
				</Link>
			) : (
				<Link href="/login">Login</Link>
			)}
		</div>
	);
};
