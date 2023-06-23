
import React from "react";
import { Avatar, Box, ButtonBase, Grid, Typography } from "../mui-server-components";
import { MaetIcon } from "../maet-icon";

export interface PlayerCardProps {
	name: string;
	image?: string;
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
				borderColor: "#E5E5E5",
				display: "inline-flex",
				mt: 1,
				height: 60,
				width: 377
			}}
		>
			<Grid 
				item 
				container 
				xs={6}
				alignItems="center"
			>
				<Box sx={{ml: 2, backgroundImage: props.image || "linear-gradient(207deg, #EAE68E 13.76%, #FBBEBE 60.61%, #BEE1FB 100%);", borderRadius: "50%", width: 40, height: 41}}></Box>
				<Typography sx={{ fontWeight: 700, ml: 2 }}>{props.name}</Typography>
			</Grid>
			<Grid
				item
				container
				xs={6}
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