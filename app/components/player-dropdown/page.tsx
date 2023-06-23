"use client";

import React from "react";
import { ControlPoint } from "@mui/icons-material";
import { Grid, Typography } from "../mui-server-components";
import SearchBar  from "../search-bar/page";
import { PlayerCard } from "../player-card/page";

type PlayerDropdownProps = {};

/**
 * Search bar for finding players
 * @param {PlayerDropdownProps} props
 * @returns
 */
const PlayerDropdown = (props: PlayerDropdownProps) => {
	return (
		<Grid
			container
			direction="column"
			alignItems="center"
			sx={{pt: -1, width: 479, height: 250, border: 1, borderTop: 0, borderRadius: 3, borderColor: "#D9D9D9"}}
		>
			<Grid
				container
				item
				xs={3}
				direction="column"
				alignItems="flex-start"
			>
				<SearchBar label="Search for Player"/>
			</Grid>
			<Grid
				container
				item
				xs={7}
				direction="column"
				justifyContent="flex-start"
			>
				<PlayerCard name="Player Name" score={99}/>
				<PlayerCard name="Player Name" score={99}/>
			</Grid>
			<Grid
				container
				item
				xs={2}
				direction="row"
			>
				<ControlPoint sx={{ ml: 3}}></ControlPoint>
				<Typography sx={{ ml: 3 }}>Invite Player</Typography>
			</Grid>
		</Grid>
	);

};

export default PlayerDropdown;
