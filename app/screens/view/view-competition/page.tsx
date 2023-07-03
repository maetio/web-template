import { Box, Grid, Typography } from "app/components/providers/mui-server-components";
import React from "react";

// export interface ViewCompetitionProps {};

export 
/**
 * This screen shows competition information, top players & teams for the competition,
 * & games on the competition schedule
 * 
 * @param {ViewCompetitionProps} props 
 * @returns 
 */
const ViewCompetition = (props: ViewCompetitionProps) => {
	return (
		<Grid
			container
			direction="row"
			sx={{ml: 10, mr: 10}}
		>
			<Grid
				container
				item
				justifyContent="flex-start"
				direction="row"
			>
				<Grid
					container
					item
					direction="row"
				>
					<Typography sx={{fontWeight: 700}} variant="h5">Competition Name</Typography>
					<Typography sx={{ml: 3, fontWeight: 700}}>Host Name</Typography>
				</Grid>
				<Grid
			        container
					item
					direction="row"
				>
					<Box
						sx={{
							mb: 1,
							backgroundImage: "linear-gradient(180deg, #908EEA 0%, #BEFBE5 100%)",
							width: 250,
							height: 250,
							borderRadius: 4,
						}}
					></Box>
				</Grid>
				
			</Grid>
		</Grid>
	);
};

export default ViewCompetition;