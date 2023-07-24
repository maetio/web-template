import { BaseURL } from "config/constants";
import {
	competitionProfilesSubcollection,
	competitionsCollection,
} from "config/server";
import { InitialRating } from "constants/rating";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { PlayerResponseType } from "types/next-api";
import { CompetitionProfile } from "types/profile";

const STRIPE_SECRET = process.env.STRIPE_SECRET as string;

const stripe = new Stripe(STRIPE_SECRET, {
	apiVersion: "2022-11-15",
});

const STRIPE_ENDPOINT_SECRET_INTENT_BALANCE = process.env
	.STRIPE_ENDPOINT_SECRET_INTENT_BALANCE as string;

/**
 * Stripe webhook that adds profile to the competition after payment
 * stripe handles all the listeners, and just calls this api when the "payment_intent.succeeded" event fires
 *
 * @export
 * @param {NextRequest} req
 * @return {*}
 */
export async function POST(req: NextRequest) {
	const origin = req.headers.get("origin");

	const sig = req.headers.get("stripe-signature");

	let event;

	try {
		const body = await req.text();
		console.log("body", body);
		if (sig) {
			event = stripe.webhooks.constructEvent(
				body,
				sig,
				STRIPE_ENDPOINT_SECRET_INTENT_BALANCE
			);

			if (event && event.type === "payment_intent.succeeded") {
				const paymentIntentSucceeded = event.data
					.object as Stripe.Response<Stripe.PaymentIntent>;
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

				if (
					profileData &&
					profileData.userID &&
					typeof paymentIntentSucceeded.latest_charge === "string"
				) {
					// add the profile to the competition
					const competitionProfile: CompetitionProfile = {
						firstName: profileData.firstName || null,
						lastName: profileData.lastName || null,
						image: profileData.image || null,
						userID: profileData.userID || userID,
						type: "player",
						sport: compInfo?.sport || "basketball",
						deltaRating: profileData.deltaRating,
						rating: profileData.rating || InitialRating,
						...profileData,
						teamID: "daw",
						profileID: profileData.id,
						competitionID: compID,
						competitionEndTimeISO: null,
						teamFirstName: "dwa",
						teamLastName: "dawawd",
						stripeChargeID: paymentIntentSucceeded.latest_charge,
						// endTimestamp: compInfo?.endTimestamp || null, // need to change to create a new timestamp
					};
					await competitionProfilesSubcollection(compID)
						.doc(profileData.id)
						.set(competitionProfile, { merge: true });
				}
			}
		}
		return new NextResponse(
			JSON.stringify({
				message: "Created new Stripe account",
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
		NextResponse.json({ received: true });
	}
}
