"use client";

import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getAuth } from "firebase/auth";
import StripeForm from "app/components/stripe-form";
import { Grid } from "@mui/material";
import { useGetStripeSecret } from "../../server-actions/client/hooks/stripe-api";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
	"pk_test_51MDCdaCE8Qam1cvafPiXvoVUkJ8RUbl09Lq4WNn5Y8Sm8zO7kHDRNs0JKrP3zicoIQjL9TAtCfHSAeFp5oKjrBDD00n8HUiGDL"
);

/**
 * Display stripe example
 *
 * @return {*}
 */
const StripePage = () => {
	const [options, setOptions] = useState<{
		clientSecret: string;
		appearance: any;
	}>();

	const [{ data, isLoading, isSuccess, error }, fetchStripeData] =
		useGetStripeSecret();

	const initializePaymentSheet = async () => {
		// Auth token
		const auth = getAuth();
		const { currentUser } = auth;
		const authToken = await currentUser?.getIdToken();

		if (authToken && currentUser?.uid) {
			await fetchStripeData({
				userToken: authToken,
				userID: currentUser?.uid,
			});
		}
	};

	useEffect(() => {
		initializePaymentSheet();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (data?.paymentIntent) {
			setOptions({
				clientSecret: data.paymentIntent,
				// Fully customizable with appearance API.
				appearance: {},
			});
		}
	}, [data]);
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
					<StripeForm />
				</Elements>
			) : null}
		</Grid>
	);
};

export default StripePage;
