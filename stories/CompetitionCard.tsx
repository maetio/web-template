import { Link, SportsBasketball } from "@mui/icons-material";
import { Box, ButtonBase, Grid, Typography } from "@mui/material";
import { CalendarIcon, ClockIcon } from "@mui/x-date-pickers";
import React from "react";

type Props = {}

export const CompetitionCard = (props: Props) => {
	return (
		<Grid
			container
			direction="row"
			spacing={2}
			justifyContent="flex-start"
			alignItems="center" 
			sx={{
				backgroundColor: "#f5f5f4",
				border: 1,
				borderRadius: 2,
				borderColor: "#f5f5f4",
				flex: "flex-inline"
			}}>
			<Grid 
				container 
				item xs={2}
				alignItems="center"
			>
				<ButtonBase sx={{ width: 100, height: 100, border: 1, borderRadius: 1, 
					borderColor: "#f5f5f4", backgroundColor: "purple", m: 1 }}>
            
				</ButtonBase>
			</Grid>
			<Grid
				item xs
				container
				direction="column"
			>
				<Typography sx={{fontWeight: 400}}>
				Grand Prairie Youth Rec Tournament
				</Typography>
				
				<Box
					sx={{
						display: "flex"
					}}>
					<SportsBasketball></SportsBasketball>
					<Link></Link>
					<Typography>Basketball Tournament</Typography>
				</Box>
				<Box sx={{
					display: "flex" 
				}}>
					<CalendarIcon></CalendarIcon>
					<Typography>April 7</Typography>
				</Box>
			</Grid>
		</Grid>
	);
};

