import React from "react";
import SearchBar from "../search-bar/page";
import { Grid } from "../mui-server-components";
import { PlayerCard } from "../player-card/page";

type TeamSearchBarProps = {};

/**
 * Search bar for finding teams
 * tsb = TeamSearchBar
 * @param {TeamSearchBarProps} props
 * @returns
 */
const TeamSearchBar = (props: TeamSearchBarProps) => {
	return(
		<Grid
			container
			direction="column"
			sx={{width: 480, height: 1200, borderRadius: 4, borderColor: "#D9D9D9"}}
		>
			<Grid
				container
				item
				xs={3}
				direction="column"
			>
				<SearchBar label="Search for Player"/>
			</Grid>
			<Grid
				container
				item
				xs={6}
				direction="column"
				justifyContent="flex-start"
			>
				<PlayerCard name="Player Name" score={99}/>
				<PlayerCard name="Player Name" score={99}/>
			</Grid>
		</Grid>
		
	);
};

export default TeamSearchBar;