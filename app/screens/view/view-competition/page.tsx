import {
	Box,
	Grid,
	LocationOn,
	Typography,
} from "app/components/providers/mui-server-components";
import React from "react";

// export interface ViewCompetitionProps {};

export /**
 * This screen shows competition information, top players & teams for the competition,
 * & games on the competition schedule
 *
 * @param {ViewCompetitionProps} props
 * @returns
 */
const ViewCompetition = () => {
	return (
		<Grid container direction="row" sx={{ ml: 10, mr: 10 }}>
			<Grid container item justifyContent="flex-start" direction="column">
				<Grid container item direction="row">
					<Typography sx={{ fontWeight: 700 }} variant="h5">
						Competition Name
					</Typography>
					<Typography sx={{ ml: 2, fontWeight: 700 }}>
						Host Name
					</Typography>
				</Grid>
				<Grid container item direction="row">
					<Box
						sx={{
							mb: 1,
							backgroundImage:
								"linear-gradient(180deg, #908EEA 0%, #BEFBE5 100%)",
							width: 250,
							height: 250,
							borderRadius: 4,
						}}
					></Box>
					<Grid sx={{ border: 1 }} direction="column">
						<Grid direction="row">
							<Grid
								direction="column"
								container
								justifyContent="center"
								alignContent="center"
							>
								<LocationOn></LocationOn>
								<Typography>1234 Neighborhood St</Typography>
							</Grid>
						</Grid>
						<Grid direction="row"></Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default ViewCompetition;
