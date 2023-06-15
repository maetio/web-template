import { MilitaryTech, TrendingUp, TrendingUpOutlined } from "@mui/icons-material";
import { Box, ButtonBase, Grid, Typography } from "@mui/material";
import React from "react";
import MaetIcon from "../components/maet-icon";

export type TeamCardProps = {
    name: string,
    location: string,
    position: number,
    medalColor?: string,
    score: number,
    change: ScoreChange
}

export type ScoreChange = {
    color: string,
    magnitude: number
}
const TeamCard = (props: TeamCardProps) => {
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
				mt: 1,
				height: 100
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
				xs={4}
			>
				<ButtonBase sx={{ width: 70, height: 70, border: 1, borderRadius: 1, 
					borderColor: "#f5f5f4", backgroundColor: "purple", m: 1 }}>
				</ButtonBase>
			</Grid>
			<Grid
				item
				container
				xs={3}
				direction="column"
			>
				<Typography>South Bend</Typography>
				<Typography sx={{fontWeight: 700}}>Hotshots</Typography>
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
					<MaetIcon sx={{mr: 0.5}}></MaetIcon>
					<Typography sx={{fontWeight: 700, mr: 0.5}}>906</Typography>
				</Grid>
				<Grid
					container
					item
					xs={4}
					direction="row"
					alignItems="flex-end"
					justifyContent="flex-end"
				>   
					<TrendingUp sx={{color: "green",  fontSize: 20, mr: 0.5}}></TrendingUp>
					<Typography sx={{color: "green", mr: 0.5}}>+218</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default TeamCard;
