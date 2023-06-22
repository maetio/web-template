"use client";

import { useCreateFirestoreHook } from "app/api/client/hooks/template";

export /**
 * Fetches stripe information from our node/express backend from firebase
 *
 * @return {*}
 */
const useGetStripeSecret = () => {
	// define stripe query
	const stripeQuery = async ({
		userToken,
		userID,
	}: {
		userToken: string;
		userID: string;
	}) => {
		console.log("auth token", userToken);
		console.log("userContext", userID);
		const response = await fetch(
			"https://us-central1-maet-dev-ced69.cloudfunctions.net/stripeCallableFunction/stripe-session-id/XcxEgr62pG7FfSGRD3Iv",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					authtoken: userToken,
				},
				body: JSON.stringify({ userID }),
			}
		);

		const jsonRes: {
			paymentIntent: string;
			ephemeralKey: string;
			customer: string;
		} = await response.json();

		return jsonRes;
	};
	// convert to hook and return it
	return useCreateFirestoreHook(stripeQuery);
};
