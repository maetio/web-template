"use client";

import React from "react";
import { ControlPoint } from "@mui/icons-material";
import { Grid, Typography } from "../../providers/mui-server-components";
import { SearchBar } from "../search-bar/page";
import { TeamCard } from "../../cards/team-card/page";

export interface TeamDropdownProps {
	name?: string;
}

export /**
 * Search bar for finding teams
 * tsb = TeamDropdown
 * @param {TeamDropdownProps}
 * @returns
 */

const TeamDropdown: React.FC<TeamDropdownProps> = ({name}) => {
	return (
		<Grid
			container
			direction="column"
			justifyContent="flex-start"
			sx={{
				width: 480,
				height: 250,
				border: 1,
				borderRadius: 3,
				borderTop: 0,
				borderColor: "#D9D9D9",
			}}
		>
			<Grid
				container
				item
				xs={3}
				direction="column"
				justifyContent="flex-start"
				alignItems="flex-start"
			>
				<SearchBar label="Search or Create Team" />
			</Grid>
			<Grid
				container
				item
				xs={7}
				direction="column"
				justifyContent="flex-start"
			>
				<TeamCard name="Team Name" score={99} />
				<TeamCard name="Team Name" score={99} />
			</Grid>
			<Grid container item xs={2} direction="row">
				<ControlPoint sx={{ ml: 3 }}></ControlPoint>
				<Typography sx={{ ml: 3 }}>Create New Team</Typography>
			</Grid>
		</Grid>
	);
};

export default TeamDropdown;
