"use client";

import React, { useEffect } from "react";
import { signInWithLink } from "auth/client";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { indigo } from "@mui/material/colors";
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
		<Button onClick={user?.id ? () => router.push("/profile") : () => router.push("/login")}>
			{user?.id ? <Stack>
				<Avatar sx={{ backgroundColor: indigo[500] }}>{user?.email?.at(0)}</Avatar>
				<Typography>{user.email}</Typography>
			</Stack> : "Login"}
		</Button>
	);
};