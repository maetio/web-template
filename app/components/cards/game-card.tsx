import React from "react";
import { inferGameStatus, simulateMatchup } from "utils/skill-rating";
import { getShortDateString, getTimeString } from "utils/date";
import { NextImage } from "app/components/image";
import { WinProb } from "app/components/data-display/win-probability";
import { StartTimestamp } from "types/firebase";
import { Game } from "types/game";
import { XSGrayMaetIcon, XSMaetIcon } from "../icons";
import { VictoryWinProb } from "../data-display/victory-win-probability";
import { CircularProgressBar } from "../data-display/test-bar";

// modular props for all competition cards
export interface GameCardProps
	extends Omit<
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		>,
		"color"
	> {
	// id?: string;
	game: {
		id: string;
	} & Partial<StartTimestamp & Partial<Omit<Game, "id">>>;
	verified?: boolean;
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
const GameCard: React.FC<GameCardProps> = ({
	game,
	verified,
	...divParams
}) => {
	// get game data
	// const gameResponse = await fetch(`${BaseURL}/api/game/${id}`);
	// const game: GameResponseType = await gameResponse.json();

	// get game status
	const gameStatus = inferGameStatus(game.team1?.points, game.team2?.points);

	// simulate payoffs
	const { player1: team1Rating, player2: team2Rating } = simulateMatchup(
		game.team1?.rating,
		game.team2?.rating,
		{
			player1Points: game.team1?.points,
			player2Points: game.team2?.points,
		}
	);

	const team1PointsAwarded = game.team1?.rating?.displayRating
		? team1Rating.displayRating - game.team1.rating.displayRating
		: null;

	const team2PointsAwarded = game.team2?.rating?.displayRating
		? team2Rating.displayRating - game.team2.rating.displayRating
		: null;

	return (
		<div
			{...divParams}
			className="flex min-w-full flex-wrap rounded-xl bg-gray-100 p-4"
		>
			{/* time section */}
			<section className="mb-4 w-full self-center whitespace-nowrap">
				<div className="mt-1 items-center">
					<p className="text-sm font-semibold leading-none tracking-tight text-black">
						{getShortDateString(new Date(game.startTimeISO || ""))}
						at {getTimeString(new Date(game.startTimeISO || ""))}
					</p>
				</div>
			</section>

			<div className=" flex-grow flex-col">
				{/* main game content section */}
				<section className="flex flex-col items-start justify-between py-2 md:flex-row">
					{/* left/top team */}
					<section className="flex-col items-center">
						<div className="flex flex-row flex-wrap items-center justify-center">
							<div className="isolate flex overflow-hidden">
								{game && game.team1?.image
									? game.team1.image
										.slice(0, 2)
										.map((img, index) => (
											<NextImage
												key={index}
												// className="h-12 w-12 flex-none rounded-md bg-gray-50 sm:h-16 sm:w-16 lg:h-24 lg:min-h-0 lg:w-24 2xl:h-36 2xl:w-36"
												className="relative z-0 inline-block h-[60px] w-[60px] rounded-full ring-2 ring-white sm:h-[45px] sm:w-[45px]"
												src={img}
												alt="player image"
											/>
										))
									: null}
							</div>
							<div
								className={`flex flex-col justify-center ${
									gameStatus === "team1-winner"
										? "text-black"
										: "text-gray-500"
								}`}
							>
								<p className="p-1 text-center text-xs font-semibold md:ml-1 md:p-0 lg:text-sm">
									{game.team1?.lastName}
								</p>
								<div className="flex items-center justify-center md:ml-1 md:justify-start">
									{gameStatus === "team1-winner" ? (
										<XSMaetIcon />
									) : (
										<XSGrayMaetIcon />
									)}
									<p className="ml-1 text-xs">
										{Math.round(
											game.team1?.rating?.displayRating ||
												100
										)}
									</p>
									{/* points awarded */}
									{gameStatus !== "unreported" &&
									team1PointsAwarded ? (
											<p
												className={`text-xs font-bold leading-tight tracking-tight ${
													team1PointsAwarded > 0
														? "text-green-700"
														: "text-red-800"
												}`}
											>
												{team1PointsAwarded > 0 && "+"}
												{Math.round(team1PointsAwarded)}
											</p>
										) : null}
								</div>
							</div>
						</div>
					</section>
					<div className="hidden flex-col items-start gap-8 md:flex">
						{/* win prob */}
						{game.team1?.rating &&
							game.team2?.rating &&
							gameStatus === "unreported" && (
							<WinProb
								team1Rating={game.team1?.rating}
								team2Rating={game.team2?.rating}
							/>
						)}
						{/* <div className="flex min-w-full items-center justify-center">
							{gameStatus !== "unreported" ? (
								<div className="flex items-center justify-center whitespace-nowrap rounded-2xl bg-zinc-100 p-2 sm:px-6 sm:py-3.5">
									<p className="text-1xl font-bold leading-tight tracking-tight text-gray-500 md:text-3xl ">
										<span
											className={
												gameStatus === "team1-winner"
													? "font-bold text-black"
													: ""
											}
										>
											{game.team1?.points}
										</span>{" "}
										:{" "}
										<span
											className={
												gameStatus === "team2-winner"
													? "font-bold text-black"
													: ""
											}
										>
											{game.team2?.points}
										</span>
									</p>
								</div>
							) : (
								<div className="inline-flex items-center justify-center self-center rounded-2xl bg-zinc-100 px-3.5 py-2.5 sm:px-6 sm:py-3.5">
									<text
										aria-label="Versus"
										className="text-1xl text-center font-bold leading-tight tracking-tight text-black md:text-3xl"
									>
										VS
									</text>
								</div>
							)}
						</div> */}
					</div>
					{/* right/bottom team */}
					<section className="flex w-full items-center justify-between">
						<div className="flex flex-row flex-wrap items-center justify-center md:flex-row-reverse">
							<div className=" isolate flex overflow-hidden">
								{game && game.team2?.image
									? game.team2.image
										.slice(0, 2)
										.map((img, index) => (
											<NextImage
												key={index}
												// className="h-12 w-12 flex-none rounded-md bg-gray-50 sm:h-16 sm:w-16 lg:h-24 lg:min-h-0 lg:w-24 2xl:h-36 2xl:w-36"
												className="relative z-0 inline-block h-[60px] w-[60px] rounded-full ring-2 ring-white sm:h-[45px] sm:w-[45px]"
												src={img}
												alt="player image"
											/>
										))
									: null}
							</div>

							<div
								className={`flex flex-col justify-center ${
									gameStatus === "team2-winner"
										? "text-black"
										: "text-gray-500"
								}`}
							>
								<p className="p-1 p-2 text-center text-xs font-semibold md:ml-1 md:p-0 lg:text-sm">
									{game.team2?.lastName}
								</p>
								<div className="flex items-center justify-center md:mr-1 md:items-end md:justify-end">
									<p className="ml-1 text-xs">
										{Math.round(
											game.team2?.rating?.displayRating ||
												100
										)}
									</p>
									{gameStatus === "team2-winner" ? (
										<XSMaetIcon />
									) : (
										<XSGrayMaetIcon />
									)}

									{/* points awarded */}
									{gameStatus !== "unreported" &&
									team2PointsAwarded ? (
											<p
												className={`text-xs font-bold leading-tight tracking-tight ${
													team2PointsAwarded > 0
														? "text-green-700"
														: "text-red-800"
												}`}
											>
												{team2PointsAwarded > 0 && "+"}
												{Math.round(team2PointsAwarded)}
											</p>
										) : null}
								</div>
							</div>
						</div>
						{/* victory win percentage */}
						<section>
							{game.team1?.rating &&
								game.team2?.rating &&
								gameStatus === "unreported" && (
							// <VictoryWinProb value={42} />
								<CircularProgressBar percent={46} />
							)}

							{/* <p>victory</p> */}
						</section>
						<CircularProgressBar percent={46} />
					</section>
				</section>
			</div>
		</div>
	);
};
