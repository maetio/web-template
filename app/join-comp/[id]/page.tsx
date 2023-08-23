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
import { Steps } from "app/components/layout/steps";
import { RatedCompetitionCard } from "app/components/cards";
import { MaetIcon } from "app/components/icons";

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
			<Steps
				steps={[
					{
						id: "01",
						name: "Selected Competition",
						href: "#",
						status: "complete",
					},
					{
						id: "02",
						name: "Link Maet Account",
						href: "#",
						status: "complete",
					},
					{
						id: "03",
						name: "Register",
						href: "#",
						status: "current",
					},
				]}
			/>
			<div className="flex w-full flex-1 flex-col items-center justify-center gap-8 px-6 py-12 lg:px-8">
				<div className="sm:w-full sm:max-w-md">
					{competitionData?.image ? (
						<NextImage
							className="align-center mx-auto justify-center rounded-xl"
							size={100}
							src={competitionData?.image}
							alt="competition banner"
						/>
					) : (
						<MaetIcon
							size={20}
							className="align-center mx-auto w-20 justify-center"
						/>
					)}

					<h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						{competitionData?.name || "Welcome to Maet!"}
					</h2>
				</div>

				<div className="flex flex-col gap-8 sm:w-full sm:max-w-md">
					<RatedCompetitionCard />
					{profileData && <AltPlayerCard player={profileData} />}

					<div>
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
												redirectURL="/success"
											/>
										) : (
											<button>loading</button>
										)}
									</div>
								) : (
									<ActionButton
										className="w-full"
										referRoute={`/join-comp/${params.id}/success`}
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
