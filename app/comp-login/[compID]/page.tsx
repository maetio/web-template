import React from "react";
import { AuthPageComp } from "app/components/authentication/auth-page";
import { BaseURL } from "config/constants";
import { CompetitionsResponseType } from "types/next-api";

/**
 * page that allows users to login then navigate back to the join comp screen
 *
 * @export
 * @param {{
 * 	params: { compID: string };
 * }} {
 * 	params,
 * }
 * @return {*}
 */
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
			<AuthPageComp
				redirectURL={`/join-comp/${params.compID}`}
				image={competitionData?.image}
				header={competitionData?.name}
			/>
		</main>
	);
}
