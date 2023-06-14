import { MilitaryTech } from "@mui/icons-material";
import { ButtonBase, Grid, Typography } from "@mui/material";
import React from "react";

type TeamCardProps = {
    name: string,
    location: string,
    position: number,
    score: number,
    change: number
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
				<MilitaryTech></MilitaryTech>
				<Typography sx={{fontWeight: 700}}>1</Typography>
			</Grid>
			<Grid
				item
				container
				xs={2}
			>
				<ButtonBase sx={{ width: 50, height: 50, border: 1, borderRadius: 1, 
					borderColor: "#f5f5f4", backgroundColor: "purple", m: 1 }}>
				</ButtonBase>
			</Grid>
		</Grid>
	);
};

export default TeamCard;
