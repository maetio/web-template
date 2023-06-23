"use client";

import React from "react";
import { ControlPoint } from "@mui/icons-material";
import { Grid, Typography } from "../mui-server-components";
import SearchBar from "../search-bar/page";
import { TeamCard } from "../team-card/page";

type TeamDropdownProps = {};

/**
 * Search bar for finding teams
 * tsb = TeamDropdown
 * @param {TeamDropdownProps} props
 * @returns
 */

const TeamDropdown = (props: TeamDropdownProps) => {
	return(
		<Grid
			container
			direction="column"
			sx={{width: 480, height: 250, border: 1, borderRadius: 4, borderColor: "#D9D9D9"}}
		>
			<Grid
				container
				item
				xs={3}
				direction="column"
			>
				<SearchBar label="Search or Create Team"/>
			</Grid>
			<Grid
				container
				item
				xs={7}
				direction="column"
				justifyContent="flex-start"
			>
				<TeamCard name="Team Name" score={99}/>
				<TeamCard name="Team Name" score={99}/>
			</Grid>
			<Grid
				container
				item
				xs={2}
				direction="row"
			>
				<ControlPoint sx={{ ml: 3}}></ControlPoint>
				<Typography sx={{ ml: 3 }}>Create New Team</Typography>
			</Grid>
		</Grid>
	);
};

export default TeamDropdown;