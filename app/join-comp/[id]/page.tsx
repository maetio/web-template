import React from "react";
import { CompetitionsResponseType } from "types/next-api";
import { BaseURL } from "config/constants";
import { getUserData } from "server-actions/users";
import {
	addCompetitionProfile,
	getOrCreateProfile,
} from "server-actions/profiles";
import { SubmitFormActionButton } from "app/components/submit-form-action-button";
import { MaetIcon } from "app/components/icons";
import { getStripeSession } from "server-actions/stripe";
import { ServerCheckoutButton } from "app/components/server-checkout-button";

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

		console.log("Submitting add competition profile");

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

	// const submitStipeFormAction = async () => {
	// 	"use server";

	// 	console.log("Submitting add competition profile");

	// 	try {
	// 		// update the data with the server action
	// 		if (competitionData?.id) {
	// 			return await getStripeSession(competitionData.id);
	// 		}
	// 		console.log("No user id");
	// 	} catch (e: any) {
	// 		console.warn("error with form action", e);
	// 	}
	// };

	// const data = await submitStipeFormAction();

	// const testStripeApi = async () => {
	// 	"use server";

	// 	const data = await fetch(
	// 		`${BaseURL}/api/stripe/create-payment-session/${competitionData?.id}`,
	// 		{
	// 			method: "POST",
	// 		}
	// 	);

	// 	const thing = await data.json();
	// 	console.log("thing", thing);
	// };

	const submitStipeFormAction = async () => {
		"use server";

		console.log("Submitting add competition profile");

		try {
			// update the data with the server action
			if (competitionData?.id) {
				return await getStripeSession(competitionData.id);
			}
			console.log("No user id");
		} catch (e: any) {
			console.warn("error with form action", e);
		}
	};

	const data = await submitStipeFormAction();

	return (
		<>
			<div className="flex h-full min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<MaetIcon
						size={20}
						className="align-center mx-auto w-20 justify-center"
					/>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Join {competitionData?.name}
					</h2>
				</div>
				<div className="col-span-1 flex flex-col rounded-lg bg-white text-center">
					<div className="align-center flex flex-1 flex-col justify-center p-8">
						<img
							className="mx-auto h-20 w-20 flex-shrink-0 rounded-full"
							src={profileData?.image || undefined}
							alt=""
						/>
						<h3 className="mt-6 text-lg font-medium text-gray-900">
							{profileData?.firstName} {profileData?.lastName}
						</h3>
						{/* <div className="bg-red-500 justify-center align-center">
							<div className="flex w-0 flex-1 ">
								<MaetIcon size={10} className="w-20 flex justify-center align-center" />
								<p className="text-2xl font-semibold text-gray-900">{Math.round(profileData?.rating?.displayRating || 100)}</p>
							</div>
						</div> */}
					</div>
				</div>
				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<div className="space-y-6">
						<div>
							{competitionData?.price &&
							competitionData.price > 0 ? (
								<div>
									{data?.paymentIntent ? (
										<ServerCheckoutButton
											paymentIntent={data?.paymentIntent}
										/>
									) : (
										<button>loading</button>
									)}
								</div>
							) : (
								<SubmitFormActionButton
									referRoute={`/view-comp/${params.id}`}
									colorVariant="indigo"
									title={
										competitionData?.price &&
										competitionData?.price > 0
											? `Pay $${
													competitionData.price / 100
											  } To Join`
											: "Join Competition"
									}
									icon="none"
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
