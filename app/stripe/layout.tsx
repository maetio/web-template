"use client";

import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getAuth } from "firebase/auth";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY as string);

export default function Layout({ children }: { children: React.ReactNode }) {
	const [token, setToken] = useState<string>();
	const fetchClientSecret = async () => {
		const response = await fetch(
			`${
				process.env.STRIPE_HTTP_LINK
			}//stripe-session-id/${"test comp id"}`,
			{
				method: "POST", // or 'PUT'
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userID),
			}
		);
	};

	const options = {
		// passing the client secret obtained in step 3
		clientSecret: "{{CLIENT_SECRET}}",
		// Fully customizable with appearance API.
		appearance: {},
	};

	const initializePaymentSheet = async () => {
		// Auth token
		const auth = getAuth();
		const { currentUser } = auth;
		const authToken = await currentUser?.getIdToken();
		setToken(authToken);
		// end auth token

		await getSessionID({
			compID: "6u1errx3tvv9IfsVeu00",
			userID: user.id,
			userToken: authToken || "failed",
		});
		// console.log('session data', sessionIdData);
	};

	useEffect(() => {
		initializePaymentSheet();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Elements stripe={stripePromise} options={options}>
			{children}
		</Elements>
	);
}
