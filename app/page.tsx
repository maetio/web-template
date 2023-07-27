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
	const competitionResponse = await fetch(`${BaseURL}/api/competitions/all`);
	const competitions: CompetitionsResponseType =
		await competitionResponse.json();

	return (
		<main className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
			{competitions.map((item) => (
				<Link key={item.id} href={`view-comp/${item.id}`}>
					<CompetitionCard competition={item} />
				</Link>
			))}
		</main>
	);
}
