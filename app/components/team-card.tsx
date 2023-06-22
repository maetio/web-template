"use client";

import { Box, ButtonBase, Grid, Typography } from "@mui/material";
import React from "react";
import MaetIcon from "./maet-icon";

export interface TeamCardProps {
	name: string;
	image: string;
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
						ml: 2
					}}
				></ButtonBase>
				<Typography sx={{ fontWeight: 700, ml: 2 }}>{props.name}</Typography>
			</Grid>
			<Grid
				item
				container
				xs={8}
				direction="row"
				alignItems="flex-end"
				justifyContent="flex-end"
			>
				<MaetIcon sx={{ mr: 1 }}></MaetIcon>
				<Typography sx={{ fontWeight: 300, mr: 4 }}>
					{props.score}
				</Typography>
			</Grid>
		</Grid>
	);
};

export default TeamCard;
