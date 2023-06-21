"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { signInWithLink } from "app/api/auth";
import { useRecoilValue } from "recoil";
import { UserState } from "app/recoil-store";
import { SignOutButton } from "app/components/sign-out-button";
import { useAuthContext } from "app/components/providers/auth-context";
import { useForm } from "react-hook-form";
import { privateUserCollection } from "app/api/config";
import { PrivateUserData } from "app/types";
import { doc, setDoc, or } from "firebase/firestore";
import { database } from "firebase-admin";

const useUpdatePrivateUserData = () => {
	const [isLoading, setisLoading] = useState(false);
	const [isSuccess, setisSuccess] = useState(false);
	const [error, setError] = useState("");

	const writeToFirestore = useCallback(async (userData: { id: string } & Partial<PrivateUserData>, newUser?: boolean) => {
		setisLoading(true);
		setisSuccess(false);
		setError("");

		try {
			const userRef = privateUserCollection.doc(userData.id);
			await userRef.set(userData, { merge: !newUser });

			setisLoading(false);
			setisSuccess(true);
		// eslint-disable-next-line @typescript-eslint/no-shadow
		} catch (error: any) {
			setisLoading(false);
			setisSuccess(false);
			setError(error.message);
		}
	}, []);

	return { isLoading, isSuccess, error, writeToFirestore };
};



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

	const {isLoading, isSuccess, error, writeToFirestore} = useUpdatePrivateUserData();


	// asynchronous function that handles updates to private user data (on click of form submission button)
	 const handleUpdatePrivateUserData = async (userData: { id: string } & Partial<PrivateUserData>, newUser?: boolean) => {
		
		await writeToFirestore(userData, newUser);
		if(isSuccess) {
			console.log("Private user data successfully mutated");
		}
		else {
			console.log("Mutation request failed");
		}
	};


	// set up react hook form that will take user firstName and lastName as inputs
	const { register, handleSubmit } = useForm({
		defaultValues: {
			firstName: "",
			lastName: "",
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			id: userContext!.uid,
			newUser: true
		}
	});


	return (
		<form onSubmit={handleSubmit((data) => handleUpdatePrivateUserData(data))}>
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
