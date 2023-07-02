"use client";

import React, { useState } from "react";
import { ControlPoint } from "@mui/icons-material";
import { InputField } from "app/components/user-input";
import {
	Autocomplete,
	Grid,
	TextField,
	Typography,
	createFilterOptions,
} from "app/components/providers/mui-server-components";
import algoliasearch from "algoliasearch";
import { PlayerCard } from "app/components/cards";
import { Competition, Profile, Team } from "app/types";

// declare algolia index
const algoliaClient = algoliasearch(
	process.env.ALGOLIA_APP_ID || "",
	process.env.ALGOLIA_SEARCH || ""
);

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

const testPlayers: readonly any[] = [
	{ title: "Jay Boog" },
	{ title: "Big Baller" },
];

export const AlgoliaSearchComp = <IndexT extends AlgoliaIndexes>({
	label,
	algoliaIndex,
	hitsPerPage,
	sportsSelected,
	competitionID,
}: AlgoliaSearchCompProps<IndexT>) => {
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
		<Autocomplete
			id="grouped-demo"
			openOnFocus={false}
			disablePortal={true}
			freeSolo
			options={testPlayers}
			getOptionLabel={(option) => {
				// Value selected with enter, right from the input
				if (typeof option === "string") {
					return option;
				}
				// Add "xxx" option created dynamically
				if (option.inputValue) {
					return option.inputValue;
				}
				// Regular option
				return option.title;
			}}
			// options={options.sort(
			// 	(a, b) => -b.firstLetter.localeCompare(a.firstLetter)
			// )}
			// groupBy={(option) => option.firstLetter}
			sx={{ width: 300 }}
			renderInput={(params) => <InputField {...params} label="Search" />}
			renderGroup={(params) => (
				<li key={params.key}>
					{/* <GroupHeader>{params.group}</GroupHeader>
					<GroupItems>{params.children}</GroupItems> */}
				</li>
			)}
		/>
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
