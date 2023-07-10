import React from "react";
import { CompetitionsResponseType } from "app/types/next-api";
import Link from "next/link";

/**
 * Home screen of the application
 *
 * @export
 * @return {*} 
 */
export default async function Home() {
	// fetch competition data
	const competitionResponse = await fetch(`${process.env.NEXT_PUBLIC_PROJECT_DOMAIN}/api/competitions/all`);
	const competitions: CompetitionsResponseType = await competitionResponse.json();

	return (
		<main>
			{competitions.map((item) => (
				<Link key={item.id} href={`view-comp/${item.id}`}>
					<h1 >{item.name}</h1>
				</Link>
			))}
		</main>
	);
}
