"use client";

import React, { useState } from "react";
import {
	useStripe,
	useElements,
	PaymentElement,
} from "@stripe/react-stripe-js";
import { BaseURL } from "config/constants";

export interface StripeFormParams {
	options?: any;
}

export const StripeForm: React.FC<StripeFormParams> = () => {
	const stripe = useStripe();
	const elements = useElements();

	const [errorMessage, setErrorMessage] = useState<string>();

	const handleSubmit = async () => {
		// We don't want to let default form submission happen here,
		// which would refresh the page.
		// event.preventDefault();

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
			<form>
				<PaymentElement />
				<button onClick={handleSubmit} disabled={!stripe}>
					Submit
				</button>
				{/* Show error message to your customers */}
				{errorMessage && <div>{errorMessage}</div>}
			</form>
		</section>
	);
};
