"use client";

import React, { useEffect } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { signInWithLink } from "app/api/client/auth";
import { useRecoilValue } from "recoil";
import { UserState } from "app/recoil-store";
import { SignOutButton } from "app/components/user-input/sign-out-button";
import { useAuthContext } from "app/components/providers/auth-context";
import { useForm } from "react-hook-form";
import { useUpdatePrivateUserData } from "app/api/client/hooks/user-api";
import { EditProfileSchemaType, editProfileSchema } from "app/utils/schemas";
import { yupResolver } from "@hookform/resolvers/yup";

export /**
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

	const [{ isLoading, isSuccess, error }, updateData] =
		useUpdatePrivateUserData();

	// set up react hook form that will take user firstName and lastName as inputs
	const { register, handleSubmit, reset } = useForm({
		defaultValues: {
			firstName: "",
			lastName: "",
		},
		resolver: yupResolver(editProfileSchema),
	});

	// asynchronous function that handles updates to private user data (on click of form submission button)
	const handleUpdatePrivateUserData = async ({
		firstName,
		lastName,
	}: EditProfileSchemaType) => {
		const userData = {
			firstName,
			lastName,
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			id: userContext!.uid,
		};

		await updateData(userData);
		if (isSuccess) {
			console.log("Private user data successfully mutated");
		} else {
			console.log("Mutation request failed");
		}
		reset();
	};

	return (
		<form onSubmit={handleSubmit(handleUpdatePrivateUserData)}>
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
				<TextField
					{...register("firstName", { required: true })}
					sx={{ m: 3 }}
					label="First Name"
				></TextField>
				<TextField
					{...register("lastName", { required: true })}
					label="Last Name"
				></TextField>
				<Button variant="outlined" type="submit" sx={{ m: 2 }}>
					Submit
				</Button>

				<SignOutButton />
			</Grid>
		</form>
	);
};

export default Home;
