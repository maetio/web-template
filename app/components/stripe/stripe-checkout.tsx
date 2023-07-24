"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { StripeCheckoutButtonComp } from "./stripe-checkout-button";

export interface StripeCheckoutParams {
	paymentIntent: string;
}

export /**
 * all in one stripe component that displays the stripe form and checkout button.
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
const StripeCheckout: React.FC<StripeCheckoutParams> = ({ paymentIntent }) => {
	// load stripe
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
