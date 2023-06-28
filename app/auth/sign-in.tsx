"use client";

import React, { useEffect, useState } from "react";
import { Button, TextField, Grid, Typography, Paper, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema } from "app/utils/schemas";
import {
	sendPasswordlessLoginEmail,
	signInWithLink,
} from "actions/client/auth";
import { useFirebaseAuth } from "auth/firebase";
import { clientConfig } from "config/client-config";

export const SignIn: React.FC<{}> = () => {
	// useForm & useAuth initialization
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<{ email: string }>({
		resolver: yupResolver(emailSchema),
	});

	const { getFirebaseAuth } = useFirebaseAuth(clientConfig);

	// state used to detect if email sent
	const [sentEmail, setSentEmail] = useState(false);

	// get user state

	const submitEmail = async (data: { email: string }) => {
		console.log("fired from submuit emial");
		const auth = await getFirebaseAuth();
		await sendPasswordlessLoginEmail(auth, data.email);
		setSentEmail(true);
	};

	// useEffect(() => {
	// 	// get router
	// 	// console.log('router query', router.query);
	// 	console.log(window.location.href, document.referrer);

	// 	console.log(
	// 		"signing",
	// 		"sethy8656@gmail.com",
	// 		"in with",
	// 		window.location.href
	// 	);
	// }, [sentEmail, setSentEmail]);

	return (
		<form onSubmit={handleSubmit(submitEmail)}>
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justifyContent="center"
				sx={{ minHeight: "100vh" }}
			>
				<Paper variant="outlined" />
				{sentEmail ? (
					<Box>
						<Typography>
							Check your email inbox for a magic link
						</Typography>
						<br />
					</Box>
				) : (
					<Grid item alignItems="center" justifyContent="center">
						<Typography>Welcome to Maet!</Typography>
						<br />
						<TextField
							type="email"
							variant="outlined"
							label="Input your email"
							{...register("email")}
						/>
						<Button type="submit">Send Magic Link</Button>
					</Grid>
				)}
			</Grid>
		</form>
	);
};
