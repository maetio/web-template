import React from "react";
import { FaPlay } from "react-icons/fa6";
import { Game } from "types/index";
import { inferGameStatus } from "utils/skill-rating";
import { XSGrayMaetIcon } from "../icons";

// modular props for all competition cards
export interface GameCardProps
	extends Omit<
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		>,
		"color"
	> {
	game: Partial<Game>;
	verified: boolean;
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
const GameCard: React.FC<GameCardProps> = ({ game, verified, ...divParams }) => {
	// get game status
	const gameStatus = inferGameStatus(game.team1?.points, game.team2?.points);

	return (
		<div {...divParams} className="mt-4 grid h-48 lg:w-1/3 sm:w-1/2 grid-cols-12 justify-start gap-4 rounded-xl border p-4 align-top shadow-lg">
			<div className="col-span-3 flex-col flex items-center justify-center">
				{game.team1?.image ? (
					<img
						className="2xl:w-36 2xl:h-36 lg:h-24 lg:w-24 lg:min-h-0 sm:w-16 sm:h-16 w-12 h-12 flex-none rounded-md bg-gray-50"
						src={game.team1.image || undefined}
						alt=""
					/>
				) : (
					<div className="h-24 w-24 rounded-md bg-gradient-to-b from-gradientYellow via-gradientOrange to-gradientBlue flex"></div>				)}
				<div className="flex flex-wrap justify-center items-center text-center">
					<p className="p-2 lg:text-sm text-xs font-semibold">
						{game.team1?.lastName}
					</p>
				</div>
				<div className="grid grid-cols-3 lg:pl-2">
					<div className="col-span-3 flex items-center">
						<XSGrayMaetIcon />
						<p className="ml-1 text-xs text-gray-500">{game.team1?.rating?.displayRating}</p>
					</div>
				</div>
			</div>
			<div className="col-span-6 flex-col gap-8 flex items-start">
				<div className="items-center justify-center flex min-w-full">
					<div className="flex-col flex">
						<p className="font-semibold">{game.competitionName}</p>
						<div className="flex items-center justify-center mt-1">
							<p className="text-xs text-gray-300">{game.startTimeISO}</p>
						</div>
						<div className="flex-row lg:w-32">
							<div className="grid grid-cols-2 col-span-2 items-center mt-1">
								{gameStatus !== "unreported" ?
									(<div className="flex col-span-1 items-center mt-1 justify-start">
										{gameStatus === "team1-winner" ? (
											<div className="flex items-center justify-start col-span-1">
												<FaPlay className="mr-1"/>
												<p className="font-bold lg:text-xl">{game.team1?.points}</p>
											</div>) : (
											<p className="lg:text-xl">{game.team1?.points}</p>)}
									</div>) : (<div></div>)}
								{gameStatus !== "unreported" ?
									(<div className="flex col-span-1 items-center mt-1 justify-end">
										{gameStatus === "team2-winner" ? (
											<div className="flex items-center col-span-1">
												<FaPlay className="mr-1"/>
												<p className="font-bold lg:text-xl">{game.team2?.points}</p>
											</div>) : (
											<div className="flex items-center col-span-1">
												<p className="lg:text-xl">{game.team2?.points}</p>
											</div>
										)}
									</div>
									) : (
										<div></div>
									)}
							</div>
							<div className="mt-2 flex h-6 lg:mt-6">
								{verified ? (
									<div className="flex h-6 min-w-full items-center justify-center rounded-full bg-green-300 text-xs">
										<p>Verified</p>
									</div>
								) : (
									<div className="flex h-6 min-w-full items-center justify-center rounded-full bg-blue-200 text-xs">
										<p>Scheduled</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				{gameStatus ? (
					<div></div>
				) : (
					<div className="flex min-w-full flex-col">
						<div className="flex min-w-full flex-row items-start">
							<div className="ml-1 flex w-1/2 flex-col">
								<div className="flex h-3 min-w-full rounded-full bg-blue-200"></div>
								<p className="text-xs">50%</p>
							</div>
							<div className="-ml-1 mr-1 flex w-1/2 flex-col items-end">
								<div className="flex h-3 min-w-full rounded-full bg-primaryMain"></div>
								<p className="text-xs">50%</p>
							</div>
						</div>
						<div className="mb-1 mt-1 flex items-center justify-center text-sm font-bold">
							<p>Win Probability</p>
						</div>
					</div>
				)}
			</div>
			<div className="col-span-3 flex flex-col items-center justify-center">
				{game.team2?.image ? (
					<img
						className="2xl:w-36 2xl:h-36 lg:h-24 lg:w-24 lg:min-h-0 sm:w-16 sm:h-16 w-12 h-12 flex-none rounded-md bg-gray-50"
						src={game.team2.image || undefined}
						alt=""
					/>
				) : (
					<div className="h-24 w-24 rounded-md bg-gradient-to-b from-gradientYellow via-gradientOrange to-gradientBlue flex"></div>
				)}
				<div className="flex justify-center">
					<p className="p-2 lg:text-sm text-xs font-semibold text-center">
						{game.team2?.lastName}
					</p>
				</div>
				<div className="grid grid-cols-3 lg:pl-2">
					<div className="col-span-3 flex items-center">
						<XSGrayMaetIcon />
						<p className="ml-1 text-xs text-gray-500">{game.team2?.rating?.displayRating}</p>
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
