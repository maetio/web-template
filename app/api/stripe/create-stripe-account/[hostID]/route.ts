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
	_req: NextRequest,
	params: { params: { hostID: string } }
) {
	// get the parameters from the query
	const { hostID } = params.params;
	try {
		// const userCollections = await privateUserCollection.doc(hostID).get();
		const userCollections = await privateUserCollection.doc(hostID).get();
		const userCollection = userCollections.data();
		// checks to see if the user has the stripeID field in firestore, if not, generate a new one and add it to firestore. Or use the prexisting stripe ID
		if (!userCollection?.stripeID) {
			const accountRef = await stripe?.accounts.create({
				type: "express",
			});
			await privateUserCollection
				// .doc(hostID)
				.doc(hostID)
				.update({ stripeID: accountRef?.id });
			return NextResponse.json({ message: "Created new Stripe account" });
		}
		return NextResponse.json({
			message: "user already has a stripe account",
		});
	} catch (e) {
		return NextResponse.json({
			message: `Something went wrong error: ${e}`,
		});
	}
}
