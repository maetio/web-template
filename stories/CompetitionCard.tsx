import { Link, SportsBasketball } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import { CalendarIcon, ClockIcon } from "@mui/x-date-pickers";
import React from "react";

type Props = {}

export const CompetitionCard = (props: Props) => {
	return (
		<Box sx={{
			backgroundColor: "#f5f5f4",
			border: 1,
			borderRadius: 2,
			borderColor: "#f5f5f4",
			flex: "flex-inline"
		}}>
			<Grid
				container
				direction="column"
			>
				<Typography sx={{fontWeight: 400}}>
				Grand Prairie Youth Rec Tournament
				</Typography>
				<Box sx={{
                    
				}}
				></Box>
				<Box
					sx={{
						display: "flex"
					}}>
					<SportsBasketball></SportsBasketball>
					<Link></Link>
					<Typography>Basketball Tournament</Typography>
				</Box>
				<Box sx={{
					flexDirection: "column-reverse",
					display: "flex" 
				}}>
                    April 7
				</Box>
			</Grid>
		</Box>
	);
};

