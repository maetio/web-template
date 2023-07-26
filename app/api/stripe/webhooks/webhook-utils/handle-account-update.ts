import { privateUserCollection } from "config/server";
import Stripe from "stripe";

export /**
 * handleAccountUpdate, this functions takes in the account information returned from the stripe webhook and does the propper mutations needed to the private-user-data to keep everything up to date
 *
 * @param {Stripe.Response<Stripe.Account>} account
 */
const handleAccountUpdate = async (
	account: Stripe.Response<Stripe.Account>
) => {
	const query = privateUserCollection.where("stripeHostID", "==", account.id);

	const promise: Promise<FirebaseFirestore.WriteResult>[] = [];

	await query
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots

				promise.push(
					doc.ref.update({
						stripeSeller: account,
						charges_enabled: account?.charges_enabled,
					})
				);
			});
		})
		.catch((error) => {
			console.log("error:", error);
		});

	await Promise.all(promise);
};
