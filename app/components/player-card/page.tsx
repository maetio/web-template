import {
	MilitaryTech,
	TrendingUp,
	TrendingUpOutlined,
} from "@mui/icons-material";
import { Avatar, ButtonBase, Grid, Typography } from "@mui/material";
import React from "react";
import { RatingChange } from "app/types";
import MaetIcon from "../maet-icon";

export interface PlayerCardProps {
	name: string;
	image: string;
	score: number;
}

export /**
 * Card that renders the initial player data
 *
 * @param {*} {
 *		PlayerCardProps
 *	}
 *  @return {*}
 *
 */
const PlayerCard = (props: PlayerCardProps) => {
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
				<Avatar></Avatar>
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

export default PlayerCard;
