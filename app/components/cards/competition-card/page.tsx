import { TinyMaetIcon } from "app/components/icons";
import React from "react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

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
		<div className="mt-4 grid h-44 w-1/4 grid-cols-12 justify-start gap-4 rounded-xl border p-4 align-top shadow-xl">
			<div className="col-span-3 flex-row items-center">
				<div className="h-24 w-24 rounded-md bg-gradient-to-b from-gradientYellow via-gradientOrange to-gradientBlue"></div>
				<div>
					<text className="p-2 text-center text-sm font-semibold">
						Team Name
					</text>
				</div>
				<div className="grid grid-cols-3 pl-2">
					<div className="col-span-1 flex items-center">
						<TinyMaetIcon />
						<text className="ml-1 text-xs text-gray-300">99</text>
					</div>
					<div className="col-span-2 flex items-center justify-end">
						<FaArrowTrendUp className="mr-1 text-green-800" />
						<text className="text-xs text-green-800">+99</text>
					</div>
				</div>
			</div>
			<div className="col-span-6"></div>
			<div className="col-span-3 flex-row items-center">
				<div className="h-24 w-24 rounded-md bg-gradient-to-b from-gradientYellow via-gradientOrange to-gradientBlue"></div>
				<div>
					<text className="p-2 text-center text-sm font-semibold">
						Team Name
					</text>
				</div>
				<div className="grid grid-cols-3 items-center pl-2 pr-2">
					<div className="col-span-1 flex items-center">
						<TinyMaetIcon />
						<text className="ml-1 text-xs text-gray-300">99</text>
					</div>
					<div className="col-span-2 flex items-center justify-end">
						<FaArrowTrendDown className="mr-1 text-red-500" />
						<text className="text-xs text-red-500">-99</text>
					</div>
				</div>
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
