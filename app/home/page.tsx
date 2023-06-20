"use client";

import React, { useEffect } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { signInWithLink } from "app/api/auth";
import { useRecoilValue } from "recoil";
import { UserState } from "app/recoil-store";
import { SignOutButton } from "app/components/sign-out-button";
import { useAuthContext } from "app/components/providers/auth-context";

/**
 * Will have the home screen render
 *
 * @return {*}
 */
const Home = () => {
	// get user state
	const user = useRecoilValue(UserState);

	// use effect hook to sign in with email link
	useEffect(() => {
		signInWithLink(user.email, window.location.href);
	}, [user.email]);

	// get the auth context
	const userContext = useAuthContext();

	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"
			sx={{ minHeight: "100vh" }}
		>
			<Typography>
				{userContext?.uid.length
					? `You are logged in as ${userContext?.email}.`
					: "You are not logged in."}
			</Typography>
			<TextField label="First Name"></TextField>
			<TextField label="Last Name"></TextField>
			<SignOutButton />
		</Grid>
	);
};

export default Home;
