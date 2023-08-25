"use client";

import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
import { StripePaymentElement } from "./stripe-payment-element";

export interface StripeCheckoutParams
	extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
	paymentIntentSecret: string;
	paymentIntent: Stripe.Response<Stripe.PaymentIntent> | undefined;
	redirectURL?: string;
	price: number;
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
const StripeCheckoutForm: React.FC<StripeCheckoutParams> = ({
	paymentIntentSecret,
	paymentIntent,
	redirectURL,
	price,
	...sectionParams
}) => {
	// check if the env variable exists
	if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
		throw Error("No Stripe Publishable key in the env.");

	// load stripe
	const stripePromise = loadStripe(
		process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
	);

	return (
		<section {...sectionParams}>
			<Elements
				stripe={stripePromise}
				options={{
					clientSecret: paymentIntentSecret,
					// Fully customizable with appearance API.
					// https://stripe.com/docs/elements/appearance-api
					appearance: {},
				}}
			>
				<StripePaymentElement
					paymentIntent={paymentIntent}
					redirectURL={redirectURL}
					price={price}
				/>
			</Elements>
		</section>
	);
};
