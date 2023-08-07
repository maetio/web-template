import React from "react";
import { AuthPageComp } from "app/components/authentication/auth-page";

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
