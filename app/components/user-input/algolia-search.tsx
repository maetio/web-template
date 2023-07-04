"use client";

import React, { useState } from "react";
import { InputField } from "app/components/user-input";
import { Box } from "app/components/providers/mui-server-components";
import algoliasearch from "algoliasearch";
import { PlayerCard, TeamCard } from "app/components/cards";
import { Competition, Profile, Team } from "app/types";

// declare algolia index
const algoliaClient = algoliasearch(
	process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "",
	process.env.NEXT_PUBLIC_ALGOLIA_SEARCH || ""
);

console.log("algolia client", algoliaClient);

type AlgoliaIndexes = "profiles" | "teams";
// | "competition-teams"
// | "competition-players"
// | "dev-competition-teams"
// | "dev-competition-players";
type AlgoliaSearchTypes = {
	// 'public-user-data': { id: string } & Partial<Profile>;
	profiles: { id: string } & Partial<Profile>;
	teams: { id: string } & Partial<Team>;
	// "competition-teams": { id: string } & Partial<CompetitionTeam>;
	// "competition-players": { id: string } & Partial<CompetitionProfile>;
	// "dev-competition-teams": { id: string } & Partial<CompetitionTeam>;
	// "dev-competition-players": { id: string } & Partial<CompetitionProfile>;
};

export interface AlgoliaSearchCompProps<IndexT extends AlgoliaIndexes> {
	algoliaIndex: IndexT;
	label?: string;
	hitsPerPage?: number;
	sportsSelected?: Competition["sport"][];
	competitionID?: string;
}

export /**
 * Prebuild search component that searches algolia index
 *
 * @template IndexT
 * @param {// competitionID,
 * AlgoliaSearchCompProps<IndexT>} {
 * 	label,
 * 	algoliaIndex,
 * 	hitsPerPage,
 * 	sportsSelected,
 * }
 * @return {*} 
 */
const AlgoliaSearchComp = <IndexT extends AlgoliaIndexes>({
	label,
	algoliaIndex,
	hitsPerPage,
	sportsSelected,
}: // competitionID,
AlgoliaSearchCompProps<IndexT>) => {
	// set states
	const [searchResults, setSearchResults] = useState<
		AlgoliaSearchTypes[IndexT][]
	>([]);

	const searchIndex = algoliaClient.initIndex(algoliaIndex);

	// create the algolia search, set the results
	const createSearch = async (
		text: string
	): Promise<AlgoliaSearchTypes[IndexT][]> => {
		const { hits } = await searchIndex.search<AlgoliaSearchTypes[IndexT]>(
			text,
			{
				facets: ["sport"],
				filters: "",
				// pretty much if you don't provide a competition ID or a 'sportsSeclected' prop then these filters will be undefined and get all the data from the given index
				// competitionID &&
				// (algoliaIndex === "competition-teams" ||
				// 	algoliaIndex === "competition-players" ||
				// 	algoliaIndex === "dev-competition-teams" ||
				// 	algoliaIndex === "dev-competition-players")
				// 	? `competitionID:${competitionID}`
				// 	: undefined,
				// this logic could also be in the filters property but figured it looks nicers have the seperate filtering properties depending on which index user's choose
				facetFilters:
					// the facetFilter takes a weird type of an array of arrays. In the algolia architecture in notion I have a few links for learning about facetfilters. If you provide no sportsSelected then it takes from all the sports
					// if you specify the sport/sports then it only takes from those sports. EX only takes soccer and basketball [['sport:soccer', 'sport:basketball']]
					sportsSelected &&
					(algoliaIndex === "profiles" || algoliaIndex === "teams")
						? [sportsSelected]
						: undefined,
				hitsPerPage,
				length: 5,
				offset: 0,
			}
		);
		setSearchResults(hits);
		if (text.length === 0) {
			setSearchResults([]);
		}
		return hits;
	};

	return (
		<Box>
			<InputField
				id="input"
				onChange={(e) => {
					console.log(e.target.value);
					console.log(
						process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
						process.env.NEXT_PUBLIC_ALGOLIA_SEARCH
					);
					createSearch(e.target.value);
				}}
				label={label || ""}
			/>
			{searchResults
				? searchResults.map((item) => {
					if (algoliaIndex === "profiles") {
						return (
							<PlayerCard
								key={item.id}
								image={item.image || undefined}
								name={
									item.lastName || item.firstName
										? `${item.firstName} ${item.lastName}`
										: ""
								}
								score={item.rating?.displayRating}
							/>
						);
					}
					return (
						<TeamCard
							key={item.id}
							image={item.image || undefined}
							name={
								item.lastName || item.firstName
									? `${item.firstName} ${item.lastName}`
									: ""
							}
							score={item.rating?.displayRating}
						/>
					);
				  })
				: undefined}
		</Box>
	);
};

AlgoliaSearchComp.defaultProps = {
	label: undefined,
	hitsPerPage: 10,
	onItemPress: undefined,
	onItemRemove: undefined,
	onAddEmail: undefined,
	multiSelect: false,
	hideSelector: false,
	competitionID: undefined,
	sportsSelected: undefined,
	onChangeText: undefined,
	errorMessage: undefined,
	renderItem: undefined,
	_input: undefined,
};
