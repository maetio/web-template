"use client";

import React, { useEffect } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { SignOutButton } from "app/components/user-input";
// import { useAuthContext } from "app/components/providers/auth-context";
import { useForm } from "react-hook-form";
import { EditProfileSchemaType, editProfileSchema } from "app/utils/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { UserProfile } from "app/user-profile";
import { mapFirebaseResponseToTenant } from "app/login/firebase";
import { useUpdatePrivateUserData } from "actions/client/hooks/user-api";
import { signInWithLink } from "actions/client/auth";
import { useAuth } from "auth/hooks";
import { useFirebaseAuth } from "auth/firebase";
import { clientConfig } from "config/client-config";

export /**
 * Will have the home screen render
 *
 * @return {*}
 */
const Home = () => {
	// get user state

	const { tenant } = useAuth();

	console.log("tenant from home page", tenant);

	const { getFirebaseAuth } = useFirebaseAuth(clientConfig);

	// get the next router
	const router = useRouter();

	const handleLogin = async () => {
		const auth = await getFirebaseAuth();
		const userCred = await signInWithLink(
			auth,
			localStorage.getItem("email") || "",
			window.location.href
		);

		console.log("user cred after signin function", userCred);
		const idTokenResult = await userCred.user.getIdTokenResult();
		const ten = await mapFirebaseResponseToTenant(
			idTokenResult,
			userCred.user
		);
		console.log("ten from login function", ten);
		console.log("token sent", idTokenResult.token);
		await fetch("/api/login", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${idTokenResult.token}`,
			},
		});
	};

	useEffect(() => {
		if (window.location.href.includes("apiKey")) {
			handleLogin();
		}
	}, []);

	// use effect hook to sign in with email link
	// useEffect(() => {}, [user.email]);

	useEffect(() => {
		console.log("tenant from UE", tenant);
	}, [tenant]);

	// get the auth context
	// const userContext = useAuthContext();

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

	const handleUpdatePrivateUserData = async ({
		firstName,
		lastName,
	}: EditProfileSchemaType) => {
		if (tenant?.id) {
			const userData = {
				firstName,
				lastName,
				id: tenant?.id,
			};

			await fetch("/api/update-name", {
				method: "POST",
				body: JSON.stringify(userData),
			});
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
				{/* <Typography>
					{userContext?.uid.length
						? `You are logged in as ${userContext?.email}.`
						: "You are not logged in."}
				</Typography> */}
				<Typography>testing</Typography>
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

				<Button
					onClick={() => {
						router.push("/stripe");
					}}
				>
					Go to Stripe
				</Button>
				<Button
					onClick={() => {
						router.push("/profile");
					}}
				>
					user profile
				</Button>

				<SignOutButton />
				<UserProfile />
			</Grid>
		</form>
	);
};

export default Home;
