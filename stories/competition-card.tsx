import { Link, SportsBasketball, SportsSoccer, SportsTennis, SportsVolleyball } from "@mui/icons-material";
import { Box, ButtonBase, Grid, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import { CalendarIcon, ClockIcon } from "@mui/x-date-pickers";
import React from "react";

// modular props for all competition cards
type CompetitionCardProps = {
	name: string,
	type: string,
	date: string,
	sport: SportsIcons,
	image: React.FC<{}>
}
type SportsIcons = {
	sportName: string,
	icon: React.FC<{}>
}

export const CompetitionCard = (props: CompetitionCardProps) => {
	return (
		<Grid
			container
			direction="row"
			justifyContent="flex-start"
			alignItems="flex-start" 
			sx={{
				backgroundColor: "#f5f5f4",
				border: 1,
				borderRadius: 2,
				borderColor: "#f5f5f4",
				display: "inline-flex",
				width: 500
			}}>
			<Grid 
				container 
				item xs={3}
				alignItems="center"
			>
				<ButtonBase sx={{ width: 100, height: 100, border: 1, borderRadius: 1, 
					borderColor: "#f5f5f4", backgroundColor: "purple", m: 1 }}>
            
				</ButtonBase>
			</Grid>
			<Grid
				item 
				xs={9}
				sm
				container
				direction="column"
				alignItems="flex-start"
			>
				<Typography sx={{fontWeight: 700}}>
					{props.name}
				</Typography>
				<Grid
					item
					container
					xs={6}
					sx={{
						display: "flex"
					}}>
					{props.sport.sportName}
					{props.type}
					<Typography sx={{ml: 1}}>{props.sport.sportName} Tournament</Typography>
				</Grid>
				<Grid
					item
					mt={5}
					container
					direction="row"
					alignItems="flex-end"
					display="flex"
					xs={6}
				>
					<CalendarIcon sx={{color: "#4f46e5" }}></CalendarIcon>
					<Typography sx={{ ml: 1}}>April 7</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
};

