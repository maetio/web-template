"use server";

import { revalidatePath } from "next/cache";
import { competitionsCollection } from "config/server";
import { getServerAuthUser } from "auth/server";
import Stripe from "stripe";

// get stripe
const stripe = process.env.STRIPE_SECRET
	? new Stripe(process.env.STRIPE_SECRET, {
			apiVersion: "2022-11-15",
	  })
	: undefined;

export async function getStripeSession(compID: string) {
	// get the user for the server
	const user = await getServerAuthUser();

	// handle if there is no user
	if (!user) {
		throw new Error("Cannot checkout for unauthenticated user");
	}

	// get the parameters from the query
	// const { compID } = params.params;

	// get the competition information from firestore. Although convenient, we DO NOT send this information in the body of the response.
	// This is becuase it could be manipulated from the frontend to change the price of a competition
	const competitionCollectionRef = competitionsCollection.doc(compID);
	const competitionCollection = (await competitionCollectionRef.get()).data();

	console.log("competition", competitionCollection);

	if (competitionCollection?.price && competitionCollection.hostID) {
		// all the commented out code below is 100% needed. Currently the destination(where the payment is going to) is hard coded.
		// This is because, the fake data gnerators, don't include hostIDs for the private-user-data.
		// down below I have the needed code to get the host stripeID from firestore and we check to make sure we have it before running the 'stripe?.ephemeralKeys.create'

		// const hostInformationRef = privateUserCollection.doc(competitionCollection.hostID);
		// const hostInformation = (await hostInformationRef.get()).data();

		// if (hostInformation?.stripeID) {
		const customer = await stripe?.customers.create();
		const ephemeralKey = await stripe?.ephemeralKeys.create(
			{ customer: customer?.id },
			{ apiVersion: "2022-11-15" }
		);
		const paymentIntent = await stripe?.paymentIntents.create({
			// we will use this meta data to store the user ID, and comp ID. This will allow the paymentIntent webhook to have this information, so we can allow the user access to the competition.
			// without this, there is not enough inforation to make these changes to the user.
			metadata: {
				hostID: "something from metadata",
			},

			amount: competitionCollection.price,

			currency: "usd",
			customer: customer?.id,
			automatic_payment_methods: {
				enabled: true,
			},
			// currently Maet is taking 1% of the transaction
			application_fee_amount: competitionCollection.price * 100 * 0.1,
			transfer_data: {
				destination: "acct_1NUtUkCSsxIqErmb",
				// destination: hostInformation.stripeID,
			},
		});

		const stripeSession = {
			paymentIntent: paymentIntent?.client_secret,
			ephemeralKey: ephemeralKey?.secret,
			customer: customer?.id,
			publishableKey:
				"pk_test_51MDCdaCE8Qam1cvafPiXvoVUkJ8RUbl09Lq4WNn5Y8Sm8zO7kHDRNs0JKrP3zicoIQjL9TAtCfHSAeFp5oKjrBDD00n8HUiGDL",
		};

		console.log("backend thing", stripeSession);

		return stripeSession;
	}

	revalidatePath("/");
}
