import React from "react";
import ReactDOM from "react-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export default function Layout({ children }: { children: React.ReactNode }) {
	const options = {
		// passing the client secret obtained in step 3
		clientSecret: "{{CLIENT_SECRET}}",
		// Fully customizable with appearance API.
		appearance: {
			/* ... */
		},
	};

	return (
		<Elements stripe={stripePromise} options={options}>
			{children}
		</Elements>
	);
}
