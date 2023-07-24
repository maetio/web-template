"use client";

import React, { useState } from "react";
import {
	useStripe,
	useElements,
	PaymentElement,
} from "@stripe/react-stripe-js";
import { BaseURL } from "config/constants";

export /**
 * displays the stripe checkout component, and also processes the payment
 * on succes, but navigate the user to the /profile screen
 *
 * @return {*}
 */
const StripeCheckoutButtonComp: React.FC<{}> = () => {
	// setting up the client comment docs
	// https://stripe.com/docs/connect/collect-then-transfer-guide?platform=web&payment-ui=elements&client=react#set-up-stripe.js

	// get stripe config variables
	const stripe = useStripe();
	const elements = useElements();

	// error state
	const [errorMessage, setErrorMessage] = useState<string>();

	// handle the payment(straight from stripes docs)
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		// We don't want to let default form submission happen here,
		// which would refresh the page.
		event.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js hasn't yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		const { error } = await stripe.confirmPayment({
			// `Elements` instance that was used to create the Payment Element
			elements,
			confirmParams: {
				return_url: `${BaseURL}/profile`,
			},
		});

		if (error) {
			// This point will only be reached if there is an immediate error when
			// confirming the payment. Show error to your customer (for example, payment
			// details incomplete)
			setErrorMessage(error?.message);
		} else {
			// Your customer will be redirected to your `return_url`. For some payment
			// methods like iDEAL, your customer will be redirected to an intermediate
			// site first to authorize the payment, then redirected to the `return_url`.
		}
	};

	return (
		<section>
			<form onSubmit={handleSubmit}>
				<PaymentElement />
				<button
					className="mt-5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
					disabled={!stripe}
					type="submit"
				>
					Join Competition
				</button>
				{/* Show error message to your customers */}
				{errorMessage && <div>{errorMessage}</div>}
			</form>
		</section>
	);
};
