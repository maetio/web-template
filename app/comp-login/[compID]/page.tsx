import React from "react";
import { BaseURL } from "config/constants";
import { CompetitionsResponseType } from "types/next-api";
import { AuthEmailForm } from "app/components/auth-email-form";

export default async function CompLoginPage({ params }: { params: { compID: string } }) {
	// get competition data
	const competitionResponse = await fetch(`${BaseURL}/api/competitions/${params.compID}`);
	const competitions: CompetitionsResponseType = await competitionResponse.json();
	const competitionData = competitions.at(0);

	return (
		<main>
			<h1>Get a magic link to join the competition.</h1>
			<h1>Competition Name: {competitionData?.name}</h1>
			<AuthEmailForm referringURL={`${BaseURL}/comp-login/${params.compID}`} />
		</main>
	);
}
