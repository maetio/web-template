import React from "react";
import { BaseURL } from "config/constants";
import { CompetitionsResponseType } from "types/next-api";
import { AuthEmailForm } from "app/components/auth-email-form";

export default async function CompLoginPage({
	params,
}: {
	params: { compID: string };
}) {
	// get competition data
	const competitionResponse = await fetch(
		`${BaseURL}/api/competitions/${params.compID}`
	);
	const competitions: CompetitionsResponseType =
		await competitionResponse.json();
	const competitionData = competitions.at(0);

	return (
		<main>
			<AuthEmailForm
				redirectURL={`${BaseURL}/redirect-comp/${params.compID}`}
			/>
			<h2 className="mt-3 text-center text-2xl leading-9 tracking-tight text-gray-900">
				To join {competitionData?.name}.
			</h2>
		</main>
	);
}
