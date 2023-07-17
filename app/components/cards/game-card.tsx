import React from "react";
import { FaPlay } from "react-icons/fa6";
import { XSGrayMaetIcon } from "../icons";

// modular props for all competition cards
export interface GameCardProps extends Omit<
React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>,
"color"
> {
	compName?: string;
	team1Name?: string;
	team2Name?: string;
	team1Rating?: number;
	team2Rating?: number;
	team1Score?: number;
	team2Score?: number;
	team1Winner?: boolean;
	team2Winner?: boolean;
	compDate: string;
	type?: string;
	date?: string;
	verified?: boolean;
	gameStatus?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-shadow

export /**
 * Card that renders game data upon game completion
 *
 * @param {*} {
 *		name
 *	}
 *  @return {*}
 *
 */
const GameCard: React.FC<GameCardProps> = ({ compName, team1Name, team2Name, team1Rating, team2Rating, team1Score, team2Score, team1Winner, team2Winner, compDate, verified, gameStatus, ...divParams }) => {
	return (
		<div {...divParams} className="mt-4 grid h-48 lg:w-1/3 sm:w-1/2 grid-cols-12 justify-start gap-4 rounded-xl border p-4 align-top shadow-lg">
			<div className="col-span-3 flex-col flex items-center justify-center">
				<div className="h-24 w-24 rounded-md bg-gradient-to-b from-gradientYellow via-gradientOrange to-gradientBlue flex"></div>
				<div className="flex flex-wrap justify-center items-center text-center">
					<p className="p-2 lg:text-sm text-xs font-semibold">
						{team1Name}
					</p>
				</div>
				<div className="grid grid-cols-3 lg:pl-2">
					<div className="col-span-3 flex items-center">
						<XSGrayMaetIcon />
						<p className="ml-1 text-xs text-gray-500">{team1Rating}</p>
					</div>
				</div>
			</div>
			<div className="col-span-6 flex-col gap-8 flex items-start">
				<div className="items-center justify-center flex min-w-full">
					<div className="flex-col flex">
						<p className="font-semibold">{compName}</p>
						<div className="flex items-center justify-center mt-1">
							<p className="text-xs text-gray-300">{compDate}</p>
						</div>
						<div className="flex-row lg:w-32">
							<div className="grid grid-cols-2 col-span-2 items-center mt-1">
								{gameStatus ?
									(<div className="flex col-span-1 items-center mt-1 justify-start">
										{team1Winner ? (
											<div className="flex items-center justify-start col-span-1">
												<FaPlay className="mr-1"/>
												<p className="font-bold lg:text-xl">{team1Score}</p>
											</div>) : (
											<p className="lg:text-xl">{team1Score}</p>)}
									</div>) : (<div></div>)}
								{gameStatus ?
									(<div className="flex col-span-1 items-center mt-1 justify-end">
										{team2Winner ? (
											<div className="flex items-center col-span-1">
												<FaPlay className="mr-1"/>
												<p className="font-bold lg:text-xl">{team2Score}</p>
											</div>) : (
											<div className="flex items-center col-span-1">
												<p className="lg:text-xl">{team2Score}</p>
											</div>
										)}
									</div>) : (<div></div>)}
							</div>
							<div className="flex h-6 lg:mt-6 mt-2">
								{verified ?
									(<div className="bg-green-300 h-6 min-w-full text-xs rounded-full flex items-center justify-center">
										<p>Verified</p>
									</div>) : (<div className="h-6 bg-blue-200 flex rounded-full text-xs min-w-full items-center justify-center">
										<p>Scheduled</p>
									</div>)}
							</div>
						</div>
					</div>
				</div>
				{gameStatus ?
					(<div></div>) : (
						<div className="flex flex-col min-w-full">
							<div className="flex-row flex items-start min-w-full">
								<div className="flex w-1/2 flex-col ml-1">
									<div className="h-3 bg-blue-200 min-w-full flex rounded-full"></div>
									<p className="text-xs">50%</p>
								</div>
								<div className="flex w-1/2 flex-col -ml-1 mr-1 items-end">
									<div className="h-3 bg-primaryMain min-w-full flex rounded-full"></div>
									<p className="text-xs">50%</p>
								</div>
							</div>
							<div className="mt-1 mb-1 flex items-center justify-center text-sm font-bold">
								<p>Win Probability</p>
							</div>
						</div>
					)}
			</div>
			<div className="col-span-3 flex-col flex items-center justify-center">
				<div className="h-24 w-24 rounded-md bg-gradient-to-b from-gradientYellow via-gradientOrange to-gradientBlue flex"></div>
				<div className="flex justify-center">
					<p className="p-2 lg:text-sm text-xs font-semibold text-center">
						{team2Name}
					</p>
				</div>
				<div className="grid grid-cols-3 lg:pl-2">
					<div className="col-span-3 flex items-center">
						<XSGrayMaetIcon />
						<p className="ml-1 text-xs text-gray-500">{team2Rating}</p>
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

export default GameCard;
