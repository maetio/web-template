import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { competitionsCollection, transactionEvents } from "config/server";
import { BaseURL } from "config/constants";
import { PlayerResponseType } from "types/next-api";
import { Timestamp } from "firebase-admin/firestore";

// grab envs as string
const STRIPE_SECRET = process.env.STRIPE_SECRET as string;

const STRIPE_ENDPOINT_SECRET_INTENT_LOGGER = process.env
	.STRIPE_ENDPOINT_SECRET_INTENT_LOGGER as string;

// initialize stripe
const stripe = new Stripe(STRIPE_SECRET, {
	apiVersion: "2022-11-15",
});

/**
 * Stripe webhook that adds transaction events when certain stripe events happen
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
				STRIPE_ENDPOINT_SECRET_INTENT_LOGGER
			);

			if (event) {
				// grab the important information about this event
				const paymentIntentSucceeded = event.data
					.object as Stripe.Response<Stripe.PaymentIntent>;
				// grab the metaData that is added when the payment intend is created in the client(/server-actions/stripe.ts)
				const { userID, compID } = paymentIntentSucceeded.metadata;
				const compInfoRef = await competitionsCollection
					.doc(compID)
					.get();
				const compInfo = compInfoRef.data();

				// get initial profile
				const profileResponse = await fetch(
					`${BaseURL}/api/player/${userID}/${compInfo?.sport}`
				);
				const profileData: PlayerResponseType =
					await profileResponse.json();

				switch (event?.type) {
				case "payment_intent.canceled": {
					const data = {
						userID: profileData.userID,
						eventType: 603,
						timeStamp: Timestamp.now(),
						actionID: event.id,
						customerID: paymentIntentSucceeded.customer,
						destinationAccount:
								paymentIntentSucceeded.transfer_data
									?.destination,
						latest_charge: paymentIntentSucceeded.latest_charge,
						amount: paymentIntentSucceeded.amount,
						amountFee:
								paymentIntentSucceeded.application_fee_amount,
					};

					await transactionEvents.add(data);

					break;
				}
				case "payment_intent.payment_failed": {
					const data = {
						userID: profileData.userID,
						eventType: 602,
						timeStamp: Timestamp.now(),
						actionID: event.id,
						customerID: paymentIntentSucceeded.customer,
						destinationAccount:
								paymentIntentSucceeded.transfer_data
									?.destination,
						latest_charge: paymentIntentSucceeded.latest_charge,
						amount: paymentIntentSucceeded.amount,
						amountFee:
								paymentIntentSucceeded.application_fee_amount,
					};

					await transactionEvents.add(data);

					break;
				}
				case "payment_intent.succeeded": {
					const data = {
						userID: profileData.userID,
						eventType: 600,
						timeStamp: Timestamp.now(),
						actionID: event.id,
						customerID: paymentIntentSucceeded.customer,
						destinationAccount:
								paymentIntentSucceeded.transfer_data
									?.destination,
						latest_charge: paymentIntentSucceeded.latest_charge,
						amount: paymentIntentSucceeded.amount,
						amountFee:
								paymentIntentSucceeded.application_fee_amount,
					};

					await transactionEvents.add(data);

					break;
				}
				case "payment_intent.processing": {
					const data = {
						userID: profileData.userID,
						eventType: 601,
						timeStamp: Timestamp.now(),
						actionID: event.id,
						customerID: paymentIntentSucceeded.customer,
						destinationAccount:
								paymentIntentSucceeded.transfer_data
									?.destination,
						latest_charge: paymentIntentSucceeded.latest_charge,
						amount: paymentIntentSucceeded.amount,
						amountFee:
								paymentIntentSucceeded.application_fee_amount,
					};

					await transactionEvents.add(data);

					break;
				}
				default: {
					console.log("default case fired");
				}
				}
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
