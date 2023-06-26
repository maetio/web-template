import React from "react";
import { Box, ButtonBase, Grid, Typography } from "../../mui-server-components";

// modular props for all competition cards
export interface CompetitionCardProps {
	key: string;
	name?: string;
	type?: string;
	date?: string;
}

// eslint-disable-next-line @typescript-eslint/no-shadow

export /**
 * Card that renders the initial competition data
 *
 * @param {*} {
 *		name,
 *		competition,
 *	}
 *  @return {*}
 *
 */
const CompetitionCard = (props: CompetitionCardProps) => {
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
				mt: 1,
				height: 100,
			}}
		>
			<Grid
				container
				item
				xs={3}
				alignItems="center"
				justifyContent="center"
			>
				<ButtonBase
					sx={{
						width: 70,
						height: 70,
						border: 1,
						borderRadius: 1,
						borderColor: "#f5f5f4",
						backgroundColor: "purple",
						m: 1,
					}}
				></ButtonBase>
			</Grid>
			<Grid
				item
				xs={9}
				sm
				container
				direction="column"
				alignItems="flex-start"
			>
				<Typography sx={{ fontWeight: 700 }}>{props.name}</Typography>
				<Grid
					item
					container
					xs={6}
					sx={{
						display: "flex",
					}}
				></Grid>
				<Grid
					item
					container
					direction="row"
					alignItems="flex-end"
					display="flex"
					xs={6}
				></Grid>
			</Grid>
		</Grid>
	);
};

export default CompetitionCard;
