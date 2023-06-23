import React from "react";
import SearchBar from "../search-bar/page";
import { Grid } from "../mui-server-components";

type TeamSearchBarProps = {};

export /**
 * Search bar for finding teams
 * tsb = TeamSearchBar
 * @param {TeamSearchBarProps} props
 * @returns
 */
const TeamSearchBar = (props: TeamSearchBarProps) => {
	return(
		<Grid>
			<SearchBar label="Search for Player"/>
		</Grid>
		
	);
};
