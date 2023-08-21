import React from "react";
import { CompetitionsResponseType } from "types/next-api";
import { BaseURL } from "config/constants";
import { getUserData } from "server-actions/users";
import {
	addCompetitionProfile,
	getOrCreateProfile,
} from "server-actions/profiles";
import { ActionButton } from "app/components/action-button";
import { getStripeSession } from "server-actions/stripe";
import { StripeCheckoutForm } from "app/components/stripe/stripe-checkout-form";
import { NextImage } from "app/components/image";
import { AltPlayerCard } from "app/components/cards/alt-player-card";

/**
 * Screen will join the competition for the user
 *
 * @export
 * @param {{ params: { id: string } }} { params }
 * @return {*}
 */
export default async function JoinCompScreen({
	params,
}: {
	params: { id: string };
}) {
	// get the user data
	const user = await getUserData();

	// get competition data
	const competitionResponse = await fetch(
		`${BaseURL}/api/competitions/${params.id}`
	);
	const competitions: CompetitionsResponseType =
		await competitionResponse.json();
	const competitionData = competitions?.at(0);

	// get the profile data for the user
	const profileData = user?.id
		? await getOrCreateProfile(
			user,
			competitionData?.sport || "basketball",
			"player"
		  )
		: null;

	/**
	 * Define the submitting form action
	 *
	 * @param {FormData} data
	 */
	const submitFormAction = async () => {
		"use server";

		try {
			// update the data with the server action
			if (user?.id) {
				await addCompetitionProfile(
					params.id,
					competitionData?.sport || "basketball",
					competitionData?.endTimestamp || null,
					user?.id
				);
			}
		} catch (e: any) {
			console.warn("error with form action", e);
		}
	};

	const stripeSession = await getStripeSession(competitionData?.id);

	return (
		<main>
			<div className="flex w-full flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
				<div className="sm:w-full ">
					<NextImage
						className="align-center mx-auto justify-center rounded-xl"
						size={100}
						src={competitionData?.image}
						alt="competition banner"
					/>

					<h2 className="mt-7 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						{competitionData?.name || "Welcome to Maet!"}
					</h2>
				</div>

				<div className="sm:w-full ">
					{profileData && <AltPlayerCard player={profileData} />}

					<div className="space-y-6">
						<div>
							{competitionData?.price &&
							competitionData.price > 0 ? (
									<div>
										{stripeSession?.paymentIntentSecret ? (
											<StripeCheckoutForm
												price={competitionData.price}
												paymentIntentSecret={
													stripeSession?.paymentIntentSecret
												}
												paymentIntent={
													stripeSession?.paymentIntent
												}
											/>
										) : (
											<button>loading</button>
										)}
									</div>
								) : (
									<ActionButton
										className="w-full"
										referRoute={`/view-comp/${params.id}`}
										colorVariant="indigo"
										title="Join competition"
										action={submitFormAction}
									/>
								)}
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
