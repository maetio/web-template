import React from "react";
import { CompetitionsResponseType } from "app/types/next-api";

export default async function Home() {
	// fetch competition data
	const competitionResponse = await fetch(`${process.env.NEXT_PUBLIC_PROJECT_DOMAIN}/api/competitions/all`);
	const competitions: CompetitionsResponseType = await competitionResponse.json();

	// return the component
	return (
		<main>
			{competitions.map((item) => (
				<h1 key={item.id}>{item.name}</h1>
			))}
		</main>
	);
}
