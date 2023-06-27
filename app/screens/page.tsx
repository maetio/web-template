"use client";

import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { UserState } from "app/recoil-store";
import { SignOutButton } from "app/components/user-input";
// import { useAuthContext } from "app/components/providers/auth-context";
import { signInWithLink } from "actions/client-actions/auth";
import { useFirebaseAuth } from "auth/firebase";
import { clientConfig } from "config/client-config";

/**
 * Will have the home screen render
 *
 * @return {*}
 */
const Home = () => {
	// get user state
	const user = useRecoilValue(UserState);

	const { getFirebaseAuth } = useFirebaseAuth(clientConfig);

	const handleSignIn = async () => {
		const auth = await getFirebaseAuth()
		signInWithLink(auth, user.email, window.location.href);

	}

	// use effect hook to sign in with email link
	useEffect(() => {
		handleSignIn()
	}, [user.email]);

	// get the auth context
	// const userContext = useAuthContext();

	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"
			sx={{ minHeight: "100vh" }}
		>
			{/* <Typography>
				{userContext?.uid.length
					? `You are logged in as ${userContext?.email}.`
					: "You are not logged in."}
			</Typography> */}
			<Typography>testing</Typography>
			<SignOutButton />
		</Grid>
	);
};

export default Home;
