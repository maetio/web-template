import React from "react";
import { Box, ButtonBase, Grid, Typography } from "../../mui-server-components";
import { MaetIcon } from "../../maet-icon";

export interface TeamCardProps {
	name: string;
	image?: string;
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
				height: 60,
				width: 480
			}}
		>
			<Grid 
				item 
				container 
				xs={6} 
				alignItems="center"
				direction="row"
			>
				<Box
					sx={{
						ml: 2,
						backgroundImage:
							props.image ||
							"linear-gradient(207deg, #EAE68E 13.76%, #FBBEBE 60.61%, #BEE1FB 100%);",
						borderRadius: 2,
						width: 40,
						height: 41,
					}}
				></Box>
				<Typography sx={{ fontWeight: 700, ml: 2 }}>
					{props.name}
				</Typography>
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

export default TeamCard;
