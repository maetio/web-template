"use client";

import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { signInWithLink } from "app/api/auth";
import { useRecoilValue } from "recoil";
import { UserState } from "app/recoil-store";

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

	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"
			sx={{ minHeight: "100vh" }}
		>
			<Typography>You are logged in.</Typography>
		</Grid>);
};

export default Home;
