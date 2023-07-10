"use client";

import React, { useEffect } from "react";
import { signInWithLink } from "auth/client";
import Link from "next/link";
import { useAuthContext } from "auth/auth-context-provider";

export /**
 * Will have the home screen render
 *
 * @return {*}
 */
const ProfileButton = () => {
	// get the user context
	const user = useAuthContext();

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