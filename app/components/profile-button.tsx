"use client";

import React, { useEffect } from "react";
import { signInWithLink } from "auth/client";
import { PrivateUserData } from "types/user";
import Link from "next/link";

export /**
 * Will have the home screen render
 *
 * @return {*}
 */
const ProfileButton = ({ user }: { user: Partial<PrivateUserData> | undefined }) => {
	// will sign in the user if there is an email link referred
	useEffect(() => {
		if (window.location.href.includes("apiKey")) {
			const email = localStorage.getItem("email");
			signInWithLink(email, window.location.href);
		}
	}, []);

	return (
		<div>
			{user?.id ? <Link href="/profile">{user?.firstName} {user?.lastName}</Link> : <Link href="/login">Login</Link> }
		</div>
	);
};