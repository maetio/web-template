import React from "react";
import { CompetitionsResponseType } from "types/next-api";
import Link from "next/link";
import { BaseURL } from "config/constants";
import { CompetitionCard } from "app/components/cards/alt-comp-card";
/**
 * Home screen of the application. Shows all the competitions.
 *
 * @export
 * @return {*}
 */
export default async function Home() {
	// fetch competition data
	const competitionResponse = await fetch(
		// line belows filters comp, to just future comps
		// `${BaseURL}/api/competitions/all/${new Date().toString()}`
		`${BaseURL}/api/competitions/all`
	);
	const competitions: CompetitionsResponseType =
		await competitionResponse.json();

	return (
		<main className="mt-2 grid grid-cols-1 gap-y-12 lg:grid-cols-3">
			{competitions.map((item) => (
				<Link key={item.id} href={`view-comp/${item.id}`}>
					<CompetitionCard competition={item} />
				</Link>
			))}
		</main>
	);
}
