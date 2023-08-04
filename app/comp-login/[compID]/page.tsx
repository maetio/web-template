import React from "react";
import { BaseURL } from "config/constants";
import { CompetitionsResponseType } from "types/next-api";
import { AuthEmailForm } from "app/components/authentication/auth-email-form";

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
				containerParams="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
				providers={["google", "facebook", "guest"]}
				redirectURL={`/join-comp/${params.compID}`}
			/>
			<h2 className="mt-3 text-center text-2xl leading-9 tracking-tight text-gray-900">
				To join {competitionData?.name}.
			</h2>
		</main>
	);
}
