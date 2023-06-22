"use client";

import { MilitaryTech } from "@mui/icons-material";
import { Box, ButtonBase, Grid, Typography } from "@mui/material";
import React from "react";
import MaetIcon from "./maet-icon";

export interface TeamCardProps {
	name: string;
	score: number;
}

/* export interface ScoreChange {
	color: string;
	magnitude: number;
}
*/
export /**
 * Card that renders the initial team data
 *
 * @param {*} {
 *		TeamCardProps
 *	}
 *  @return {*}
 *
 */ const TeamCard = (props: TeamCardProps) => {
	return (
		<Grid
			container
			direction="row"
			justifyContent="flex-start"
			alignItems="center"
			sx={{
				borderBottom: 1,
				borderColor: "#f5f5f4",
				display: "inline-flex",
				mt: 1,
				height: 100,
			}}
		>
			<Grid 
				item 
				container 
				xs={4}
				alignItems="center"
			>
				<ButtonBase
					sx={{
						width: 70,
						height: 70,
						border: 1,
						borderRadius: 1,
						borderColor: "#f5f5f4",
						backgroundColor: "purple",
						m: 1,
					}}
				></ButtonBase>
				<Typography sx={{ fontWeight: 700 }}>Hotshots</Typography>
			</Grid>
			<Grid item container xs={3} direction="column">
				
			</Grid>
			<Grid
				item
				container
				xs={3}
				direction="column"
				alignItems="flex-end"
				justifyContent="flex-end"
			>
				<Grid
					container
					item
					xs={4}
					direction="row"
					alignItems="flex-end"
					justifyContent="flex-end"
					display="flex"
				>
					<MaetIcon sx={{ mr: 0.5 }}></MaetIcon>
					<Typography sx={{ fontWeight: 700, mr: 0.5 }}>
						906
					</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default TeamCard;
