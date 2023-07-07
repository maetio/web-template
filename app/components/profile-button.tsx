"use client";

import React, { useEffect } from "react";
import { signInWithLink } from "auth/client";
import { useRouter } from "next/navigation";
import { useAuthContext } from "auth/auth-context-provider";

export /**
 * Will have the home screen render
 *
 * @return {*}
 */
const ProfileButton = () => {
	// get the auth context
	const user = useAuthContext();

	// get the next router
	const router = useRouter();

	// will sign in the user if there is an email link referred
	useEffect(() => {
		if (window.location.href.includes("apiKey")) {
			const email = localStorage.getItem("email");
			signInWithLink(email, window.location.href);
		}
	}, []);

	return (
		<button onClick={user?.id ? () => router.push("/profile") : () => router.push("/login")}>
			{user?.id ? <div>
				<div>{user?.email?.at(0)}</div>
				<p>{user.email}</p>
			</div> : "Login"}
		</button>
	);
};