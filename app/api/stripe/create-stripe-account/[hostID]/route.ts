import { privateUserCollection } from "config/server";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

// get stripe
const stripe = process.env.STRIPE_SECRET
	? new Stripe(process.env.STRIPE_SECRET, {
			apiVersion: "2022-11-15",
	  })
	: undefined;

/**
 * POST function that will create a stripe account ID for a user. If they already have a stripe ID, nothing happens
 *
 * @export
 * @param {NextRequest} _req
 * @param {{ params: { hostID: string } }} params
 * @return {*}
 */
export async function POST(
	req: NextRequest,
	params: { params: { hostID: string } }
) {
	// get origin from headers
	const origin = req.headers.get("origin");

	// get the parameters from the query
	const { hostID } = params.params;
	try {
		// const userCollections = await privateUserCollection.doc(hostID).get();
		const userCollections = await privateUserCollection.doc(hostID).get();
		const userCollection = userCollections.data();
		// checks to see if the user has the stripeID field in firestore, if not, generate a new one and add it to firestore. Or use the prexisting stripe ID
		if (!userCollection?.stripeHostID) {
			const accountRef = await stripe?.accounts.create({
				type: "express",
			});
			if (accountRef?.id) {
				await privateUserCollection
					// .doc(hostID)
					.doc(hostID)
					.update({ stripeHostID: accountRef?.id });

				return new NextResponse(
					JSON.stringify({
						message: "Created new Stripe account",
						stripeID: accountRef?.id ? accountRef.id : "",
					}),
					{
						status: 200,
						headers: {
							"Access-Control-Allow-Origin": origin || "",
							"Content-Type": "application/json",
						},
					}
				);
			}
			return new NextResponse(
				JSON.stringify({
					message: "Error making stripe account ",
					stripe: stripe || "",
				}),
				{
					status: 200,
					headers: {
						"Access-Control-Allow-Origin": origin || "",
						"Content-Type": "application/json",
					},
				}
			);
		}

		return new NextResponse(
			JSON.stringify({
				message: "user already has a stripe account",
				stripeID: userCollection.stripeHostID || "",
			}),
			{
				status: 200,
				headers: {
					"Access-Control-Allow-Origin": origin || "",
					"Content-Type": "application/json",
				},
			}
		);
	} catch (e) {
		return new NextResponse(
			JSON.stringify({ message: `Something went wrong error: ${e}` }),
			{
				status: 200,
				headers: {
					"Access-Control-Allow-Origin": origin || "",
					"Content-Type": "application/json",
				},
			}
		);
	}
}
