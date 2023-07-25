import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { handleAccountUpdate } from "app/api/stripe/webhooks/webhook-utils";

// grab envs as string
const STRIPE_SECRET = process.env.STRIPE_SECRET as string;

const STRIPE_ENDPOINT_SECRET_INTENT_BALANCE = process.env
	.STRIPE_ENDPOINT_SECRET_INTENT_BALANCE as string;

// initialize stripe
const stripe = new Stripe(STRIPE_SECRET, {
	apiVersion: "2022-11-15",
});

/**
 * Stripe webhook that adds profile to the competition after payment
 * stripe handles all the listeners, and just calls this api when the "payment_intent.succeeded" event fires
 *
 * @Docs
 * https://dashboard.stripe.com/test/webhooks/create
 *
 * @export
 * @param {NextRequest} req
 * @return {*}
 */
export async function POST(req: NextRequest) {
	const origin = req.headers.get("origin");

	const sig = req.headers.get("stripe-signature");

	try {
		const body = await req.text();
		if (sig) {
			// get the event
			const event = stripe.webhooks.constructEvent(
				body,
				sig,
				STRIPE_ENDPOINT_SECRET_INTENT_BALANCE
			);

			if (event && event.type === "account.updated") {
				const account = event.data
					.object as Stripe.Response<Stripe.Account>;

				await handleAccountUpdate(account);
			}
		}
		return new NextResponse(
			JSON.stringify({
				message: "webhook completed",
			}),
			{
				status: 200,
				headers: {
					"Access-Control-Allow-Origin": origin || "",
					"Content-Type": "application/json",
				},
			}
		);
	} catch (err: any) {
		NextResponse.json({ received: false, message: err });
	}
}
