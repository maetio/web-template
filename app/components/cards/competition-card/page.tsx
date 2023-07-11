import React from "react";

// modular props for all competition cards
export interface CompetitionCardProps {
	name?: string;
	type?: string;
	date?: string;
}

// eslint-disable-next-line @typescript-eslint/no-shadow

export /**
 * Card that renders the initial competition data
 *
 * @param {*} {
 *		name, key
 *	}
 *  @return {*}
 *
 */
const CompetitionCard: React.FC<CompetitionCardProps> = ({ name }) => {
	return (
		<div className=" drop mt-4 grid h-36 w-2/5 grid-cols-12 justify-start gap-4 rounded-md border p-4 align-top">
			<div className="col-span-2">
				<div className=" h-6 w-6 rounded-md bg-gradient-to-b from-gradientYellow via-gradientOrange to-gradientBlue"></div>
			</div>
		</div>
		// <Grid
		// 	container
		// 	direction="row"
		// 	justifyContent="flex-start"
		// 	alignItems="flex-start"
		// 	sx={{
		// 		backgroundColor: "#f5f5f4",
		// 		border: 1,
		// 		borderRadius: 2,
		// 		borderColor: "#f5f5f4",
		// 		display: "inline-flex",
		// 		mt: 1,
		// 		height: 100,
		// 	}}
		// >
		// 	<Grid
		// 		container
		// 		item
		// 		xs={3}
		// 		alignItems="center"
		// 		justifyContent="center"
		// 	>
		// 		<ButtonBase
		// 			sx={{
		// 				width: 70,
		// 				height: 70,
		// 				border: 1,
		// 				borderRadius: 1,
		// 				borderColor: "#f5f5f4",
		// 				backgroundColor: "purple",
		// 				m: 1,
		// 			}}
		// 		></ButtonBase>
		// 	</Grid>
		// 	<Grid
		// 		item
		// 		xs={9}
		// 		sm
		// 		container
		// 		direction="column"
		// 		alignItems="flex-start"
		// 	>
		// 		<Typography sx={{ fontWeight: 700 }}>{name}</Typography>
		// 		<Grid
		// 			item
		// 			container
		// 			xs={6}
		// 			sx={{
		// 				display: "flex",
		// 			}}
		// 		></Grid>
		// 		<Grid
		// 			item
		// 			container
		// 			direction="row"
		// 			alignItems="flex-end"
		// 			display="flex"
		// 			xs={6}
		// 		></Grid>
		// 	</Grid>
		// </Grid>
	);
};

export default CompetitionCard;
