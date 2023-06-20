"use client";

import React, { useEffect } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { signInWithLink } from "app/api/auth";
import { useRecoilValue } from "recoil";
import { UserState } from "app/recoil-store";
import { SignOutButton } from "app/components/sign-out-button";
import { useAuthContext } from "app/components/providers/auth-context";
import { useForm } from "react-hook-form";

/**
 * Will have the home screen render
 *
 * @return {*}
 */
const Home = () => {
	
	// set up react hook form that will take user firstName and lastName as inputs
	const { register, handleSubmit } = useForm({
		defaultValues: {
			firstName: "",
			lastName: ""
		}
	});

	// asynchronous function that handles user submission of form
	const onSubmit = async (data: { firstName: string, lastName: string }) => {
		console.log(data);
	};	

	// get user state
	const user = useRecoilValue(UserState);

	// use effect hook to sign in with email link
	useEffect(() => {
		signInWithLink(user.email, window.location.href);
	}, [user.email]);

	// get the auth context
	const userContext = useAuthContext();

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
				<TextField {...register("firstName", { required: true })} sx={{m: 3}} label="First Name"></TextField>
				<TextField {...register("lastName", { required: true })} label="Last Name"></TextField>
				<Button variant="outlined" type="submit" sx={{m: 2}}>Submit</Button>

				<SignOutButton />
			</Grid>
		</form>
	);
};

export default Home;
