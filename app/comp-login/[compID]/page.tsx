import React from "react";
import { AuthPageComp } from "app/components/authentication/auth-page";

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
	return (
		<main>
			<AuthPageComp redirectURL={`/join-comp/${params.compID}`} />
		</main>
	);
}
