"use client";

import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { StripePaymentElement } from "./stripe-payment-element";

export interface StripeCheckoutParams extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
	paymentIntent: string;
	redirectURL?: string;
}

export /**
 * All in one stripe component that displays the stripe form and checkout button.
 * the client side 'Element' element is used as a provider for the useStripe hook in the
 * child componetents
 *
 * @remarks
 * I believe most of this stripe stuff has to be client since it is using the useStripe hook.
 * I played around a little trying to make it server, but ran into a few issues -Seth
 *
 * @param {*} {
 * 	paymentIntent, - payment identifier
 * }
 * @return {*}
 */
const StripeCheckoutForm: React.FC<StripeCheckoutParams> = ({ paymentIntent, redirectURL, ...sectionParams }) => {
	// check if the env variable exists
	if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) throw Error("No Stripe Publishable key in the env.");

	// load stripe
	const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

	return (
		<section {...sectionParams}>
			<Elements
				stripe={stripePromise}
				options={{
					clientSecret: paymentIntent,
					// Fully customizable with appearance API.
					// https://stripe.com/docs/elements/appearance-api
					appearance: {},
				}}
			>
				<StripePaymentElement />
			</Elements>
		</section>
	);
};
