import { Link, SportsBasketball, SportsSoccer, SportsTennis, SportsVolleyball } from "@mui/icons-material";
import { Box, ButtonBase, Grid, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import { CalendarIcon, ClockIcon } from "@mui/x-date-pickers";
import React from "react";

// modular props for all competition cards
export type CompetitionCardProps = {
	name: string,
	type?: string
	date: string,
	sport: Sports,
}

// each sport prop will have a MUI icon and sport name associated with it
export type Sports = {
	sportName: string,
	icon: React.ReactNode
}


// eslint-disable-next-line @typescript-eslint/no-shadow
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
				mt: 1
			}}>
			<Grid 
				container 
				item 
				xs={3}
				alignItems="center"
			>
				<ButtonBase sx={{ width: 70, height: 70, border: 1, borderRadius: 1, 
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
					<SportsBasketball sx={{color: "orange"}}></SportsBasketball>
					<Link sx={{color: "#4f46e5"}}></Link>
					<Typography sx={{ml: 1}}>{props.sport.sportName} {props?.type}</Typography>
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
					<Typography sx={{ ml: 1}}>{props.date}</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
};

