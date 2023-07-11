import React from "react";
import { CompetitionsResponseType } from "types/next-api";
import { BaseURL } from "config/constants";
import { getUserData } from "server-actions/users";
import { getOrCreateProfile } from "server-actions/profiles";
import Link from "next/link";

/**
 * Screen will join the competition for the user
 *
 * @export
 * @param {{ params: { id: string } }} { params }
 * @return {*} 
 */
export default async function ConfirmCompScreen({ params }: { params: { id: string } }) {
	// get the user data
	const user = await getUserData();

	// get competition data
	const competitionResponse = await fetch(`${BaseURL}/api/competitions/${params.id}`);
	const competitions: CompetitionsResponseType = await competitionResponse.json();
	const competitionData = competitions?.at(0);

	// get the profile data for the user
	const profileData = user?.id ? await getOrCreateProfile(user, competitionData?.sport || "basketball", "player") : null;

	return (
		<main>
			<h1>Competition Name: {competitionData?.name}</h1>
			<br />
			<h3>Join the competition as {profileData?.firstName} {profileData?.lastName}</h3>
			<h3>Rating: {profileData?.rating?.displayRating}</h3>
			<h3>Sport: {profileData?.sport}</h3>
			<br />
			<Link href={`/view-comp/${params.id}`}>
				Return to Competition.
			</Link>
		</main>
	);
}
