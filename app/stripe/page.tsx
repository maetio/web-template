"use client";

import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getAuth } from "firebase/auth";
import { useAuthContext } from "app/components/providers/auth-context";
import CheckoutButton from "app/components/checkout-button";
import { Grid } from "@mui/material";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
	"pk_test_51MDCdaCE8Qam1cvafPiXvoVUkJ8RUbl09Lq4WNn5Y8Sm8zO7kHDRNs0JKrP3zicoIQjL9TAtCfHSAeFp5oKjrBDD00n8HUiGDL"
);

const StripePage = () => {
	const userContext = useAuthContext();

	const [options, setOptions] = useState();

	const [token, setToken] = useState<string>();
	const fetchClientSecret = async (userToken: string) => {
		console.log("auth token", userToken);
		console.log("userContext", userContext?.uid);
		const response = await fetch(
			"https://us-central1-maet-dev-ced69.cloudfunctions.net/stripeCallableFunction/stripe-session-id/vorTWuhfyOZYucw78p1F",
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

		setOptions({
			clientSecret: jsonRes.paymentIntent,
			// Fully customizable with appearance API.
			appearance: {},
		});

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

	useEffect(() => {
		initializePaymentSheet();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"
			sx={{ minHeight: "100vh" }}
		>
			<h1>heading</h1>
			{options ? (
				<Elements stripe={stripePromise} options={options}>
					<CheckoutButton />
				</Elements>
			) : null}
		</Grid>
	);
};

export default StripePage;
