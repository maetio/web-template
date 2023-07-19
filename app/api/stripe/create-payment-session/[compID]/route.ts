import { privateUserCollection } from "config/server";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

// get stripe
const stripe = process.env.STRIPE_SECRET
	? new Stripe(process.env.STRIPE_SECRET, {
			apiVersion: "2022-11-15",
	  })
	: undefined;

export async function POST(
	req: NextRequest,
	params: { params: { compID: string } }
) {
	// get the parameters from the query
	const { compID } = params.params;
	try {
		// const userCollections = await privateUserCollection.doc(hostID).get();
		const userCollections = await privateUserCollection.doc(compID).get();
		const userCollection = userCollections.data();
		// checks to see if the user has the stripeID field in firestore, if not, generate a new one and add it to firestore. Or use the prexisting stripe ID
		if (!userCollection?.stripeID) {
			const accountRef = await stripe?.accounts.create({
				type: "express",
			});
			if (accountRef?.id) {
				await privateUserCollection
					// .doc(hostID)
					.doc(compID)
					.update({ stripeID: accountRef?.id });

				return NextResponse.json({
					message: "Created new Stripe account",
					stripeID: accountRef?.id ? accountRef.id : "",
				});
			}
			return NextResponse.json({
				message: "Error making stripe account ",
				stripe: stripe || "",
			});
		}

		return NextResponse.json({
			message: "user already has a stripe account",
			stripeID: userCollection.stripeID || "",
		});
	} catch (e) {
		return NextResponse.json({
			message: `Something went wrong error: ${e}`,
		});
	}
}
