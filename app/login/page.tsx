"use client";

import React, { useState } from "react";
import { Button, TextField, Grid, Typography, Paper, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema } from "app/utils/schemas";
import {
	sendPasswordlessLoginEmail,
} from "../../auth/client";
import { useFirebaseAuth } from "../../auth-old/firebase";
import { clientConfig, auth } from "config/client";

export /**
 * Enter email form
 *
 * @return {*}
 */
const LoginPage: React.FC<{}> = () => {
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
		console.log("email inputed", data.email);
		// const auth = await getFirebaseAuth();
		await sendPasswordlessLoginEmail(auth, data.email);
		localStorage.setItem("email", data.email);
		setSentEmail(true);
	};

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

export default LoginPage;
