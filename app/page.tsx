import React from "react";
import { CompetitionsResponseType } from "types/next-api";
import Link from "next/link";
import { BaseURL } from "config/constants";
import CompetitionCard from "./components/cards/CompetitionCard";
import { GameCard } from "./components/cards";

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
		<main>
			{competitions.map((item) => (
				<Link key={item.id} href={`view-comp/${item.id}`}>
					<CompetitionCard competitionName={item.name} location={item.location?.address} competitionStart={item.startTimeISO} competitionType={item.type} sport={item.sport}/>
				</Link>
			))}
		</main>
	);
}
