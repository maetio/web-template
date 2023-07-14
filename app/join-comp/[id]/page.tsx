import React from "react";
import { CompetitionsResponseType } from "types/next-api";
import { BaseURL } from "config/constants";
import { getUserData } from "server-actions/users";
import {
	addCompetitionProfile,
	getOrCreateProfile,
} from "server-actions/profiles";
import { SubmitFormActionButton } from "app/components/submit-form-action-button";

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

	return (
		<main>
			<h1>Competition Name: {competitionData?.name}</h1>
			<br />
			<h3>
				Join the competition as {profileData?.firstName}{" "}
				{profileData?.lastName}
			</h3>
			<h3>Rating: {profileData?.rating?.displayRating}</h3>
			<h3>Sport: {profileData?.sport}</h3>
			<br />
			<SubmitFormActionButton
				action={submitFormAction}
				referRoute={`/confirm-comp/${params.id}`}
			/>
		</main>
	);
}
