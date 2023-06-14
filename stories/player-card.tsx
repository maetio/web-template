import { MilitaryTech, TrendingUp, TrendingUpOutlined } from "@mui/icons-material";
import { Avatar, ButtonBase, Grid, Typography } from "@mui/material";
import React from "react";
import MaetIcon from "../app/components/maet-icon";

export type PlayerCardProps = {
    name: string,
    position: number,
    medalColor?: string,
    score: number,
    change: ScoreChange
}

export type ScoreChange = {
    color: string,
    magnitude: number
}
const PlayerCard = (props: PlayerCardProps) => {
	return (
		<Grid
			container
			direction="row"
			justifyContent="flex-start"
			alignItems="center" 
			sx={{
				backgroundColor: "#f5f5f4",
				border: 1,
				borderRadius: 2,
				borderColor: "#f5f5f4",
				display: "inline-flex",
				width: 500
			}}>
			<Grid 
				item
				container
				xs={2}
				direction="row"
				alignItems="center"
				justifyContent="center"
				display="flex"
			>   
				<MilitaryTech sx={{color: "gold"}}></MilitaryTech>
				<Typography sx={{fontWeight: 700}}>1</Typography>
			</Grid>
			<Grid
				item
				container
				xs={2}
			>
				<Avatar></Avatar>
			</Grid>
			<Grid
				item
				container
				xs={3}
				direction="column"
			>
				<Typography sx={{fontWeight: 700}}>Jay Boog</Typography>
			</Grid>
			<Grid
				item
				container
				xs={5}
				direction="column"
				alignItems="flex-end"
				justifyContent="flex-end"
			>
				<Grid
					container
					item
					xs={6}
					direction="row"
					alignItems="flex-end"
					justifyContent="flex-end"
				>
					<MaetIcon sx={{mr: 0.5}}></MaetIcon>
					<Typography sx={{fontWeight: 700, mr: 1}}>906</Typography>
				</Grid>
				<Grid
					container
					item
					xs={6}
					direction="row"
					alignItems="flex-end"
					justifyContent="flex-end"
				>   
					<TrendingUp sx={{color: "green",  fontSize: 20, mr: 0.2}}></TrendingUp>
					<Typography sx={{color: "green", mr: 0.5}}>+218</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default PlayerCard;
