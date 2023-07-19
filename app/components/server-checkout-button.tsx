"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { StripeForm } from "./checkout-button";

export const ServerCheckoutButton = ({
	paymentIntent,
}: {
	paymentIntent: string;
}) => {
	const stripePromise = loadStripe(
		"pk_test_51MDCdaCE8Qam1cvafPiXvoVUkJ8RUbl09Lq4WNn5Y8Sm8zO7kHDRNs0JKrP3zicoIQjL9TAtCfHSAeFp5oKjrBDD00n8HUiGDL"
	);

	return (
		<section>
			<Elements
				stripe={stripePromise}
				options={{
					clientSecret: paymentIntent,
					// Fully customizable with appearance API.
					appearance: {},
				}}
			>
				<StripeForm />
			</Elements>
		</section>
	);
};
