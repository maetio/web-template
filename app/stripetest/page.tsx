"use client";

import React, { useEffect, useState } from "react";
import { Button, Grid } from "app/components/mui-server-components";
import { getAuth } from "firebase/auth";
import { useAuthContext } from "app/components/providers/auth-context";

const StripeTest = () => {
	const userContext = useAuthContext();

	const [token, setToken] = useState<string>();
	const fetchClientSecret = async (userToken: string) => {
		console.log("auth token", userToken);
		console.log("userContext", userContext?.uid);
		const response = await fetch(
			`${process.env.STRIPE_HTTP_LINK}/stripe-session-id/vorTWuhfyOZYucw78p1F`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					authtoken: userToken,
				},
				body: JSON.stringify({ userID: userContext?.uid }),
			}
		);

		const jsonRes = await response.json();

		console.log("response from api", jsonRes);
	};

	const initializePaymentSheet = async () => {
		// Auth token
		const auth = getAuth();
		const { currentUser } = auth;
		const authToken = await currentUser?.getIdToken();
		setToken(authToken);

		// end auth token

		// await getSessionID({
		// 	compID: "6u1errx3tvv9IfsVeu00",
		// 	userID: user.id,
		// 	userToken: authToken || "failed",
		// });
		if (authToken) {
			await fetchClientSecret(authToken);
		}
		// console.log('session data', sessionIdData);
	};

	// useEffect(() => {
	// 	initializePaymentSheet();
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"
			sx={{ minHeight: "100vh" }}
		>
			<Button
				onClick={async () => {
					await initializePaymentSheet();
				}}
			>
				test api
			</Button>
		</Grid>
	);
};

export default StripeTest;
