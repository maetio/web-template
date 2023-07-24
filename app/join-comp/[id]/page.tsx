import React from "react";
import { CompetitionsResponseType } from "types/next-api";
import { BaseURL } from "config/constants";
import { getUserData } from "server-actions/users";
import {
	addCompetitionProfile,
	getOrCreateProfile,
} from "server-actions/profiles";
import { ActionButton } from "app/components/action-button";
import { MaetIcon } from "app/components/icons";
import { getStripeSession } from "server-actions/stripe";
import { StripeCheckout } from "app/components/stripe/stripe-checkout";
import { NextImage } from "app/components/image";

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
			console.log("No user id");
		} catch (e: any) {
			console.warn("error with form action", e);
		}
	};

	const stripeSession = await getStripeSession(competitionData?.id);

	return (
		<>
			<div className="flex h-full min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<MaetIcon
						size={20}
						className="align-center mx-auto w-20 justify-center"
					/>
					<h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Join {competitionData?.name}
					</h2>
				</div>
				<div className="col-span-1 my-4 flex flex-col rounded-lg bg-white text-center">
					<div className="align-center flex flex-col justify-center p-8">
						<NextImage
							size={100}
							src={profileData?.image}
							alt={profileData?.firstName}
						/>
						<h3 className="my-3 text-lg font-medium text-gray-900">
							{profileData?.firstName} {profileData?.lastName}
						</h3>
						<div className="align-center flex self-center">
							<MaetIcon
								size={10}
								className="align-center flex justify-center"
							/>
							<p className="ml-2 self-center text-2xl font-semibold text-gray-900">
								{Math.round(
									profileData?.rating?.displayRating || 100
								)}
							</p>
						</div>
					</div>
				</div>
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<div className="space-y-6">
						<div>
							{competitionData?.price &&
							competitionData.price > 0 ? (
									<div>
										{stripeSession?.paymentIntent ? (
											<StripeCheckout
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
		</>
	);
}
