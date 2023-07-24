"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { StripeCheckoutButtonComp } from "./stripe-checkout-button";

export const StripeCheckout = ({
	paymentIntent,
}: {
	paymentIntent: string;
}) => {
	const stripePromise = loadStripe(
		process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
	);

	return (
		<section>
			<Elements
				stripe={stripePromise}
				options={{
					clientSecret: paymentIntent,
					// Fully customizable with appearance API.
					// https://stripe.com/docs/elements/appearance-api
					appearance: {},
				}}
			>
				<StripeCheckoutButtonComp />
			</Elements>
		</section>
	);
};
