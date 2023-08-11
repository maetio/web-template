import React from "react";
import { FaPlay } from "react-icons/fa6";
import { inferGameStatus } from "utils/skill-rating";
import { BaseURL } from "config/constants";
// import { GameResponseType } from "types/next-api";
import { GameResponseType } from "types/next-api";
import { getShortDateString, getTimeString } from "utils/date";
import { NextImage } from "app/components/image";
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
	id?: string;
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
const GameCard: React.FC<GameCardProps> = async ({
	id,
	verified,
	...divParams
}) => {
	// get game data
	const gameResponse = await fetch(`${BaseURL}/api/game/${id}`);
	const game: GameResponseType = await gameResponse.json();

	console.log("game iD", game.id);

	// get game status
	const gameStatus = inferGameStatus(game.team1?.points, game.team2?.points);

	return (
		<div
			{...divParams}
			className="mt-4 min-w-full flex-col  justify-start justify-evenly  rounded-xl border p-4 align-top shadow-lg"
		>
			{/* time section */}
			<section className="self-start">
				<div className="mt-1 items-center">
					<p className="text-3xl font-semibold text-black">
						{getShortDateString(new Date(game.startTimeISO || ""))}{" "}
					</p>
					<p className="text-sm font-semibold text-gray-500">
						at {getTimeString(new Date(game.startTimeISO || ""))}
					</p>
				</div>
			</section>
			{/* main game content section */}
			<section className="flex flex-row justify-evenly">
				<div className="flex flex-col items-center justify-center">
					<div className=" isolate flex flex overflow-hidden">
						{game &&
						game.team1?.image &&
						typeof game.team1?.image !== "string" ? (
								game.team1.image.slice(0, 2).map((img, index) => (
									<NextImage
										key={index}
										// className="h-12 w-12 flex-none rounded-md bg-gray-50 sm:h-16 sm:w-16 lg:h-24 lg:min-h-0 lg:w-24 2xl:h-36 2xl:w-36"
										className="relative z-0 inline-block h-[35px] w-[35px] rounded-full ring-2 ring-white"
										src={img}
										alt="player image"
									/>
								))
							) : (
								<NextImage
									className="h-12 w-12 flex-none rounded-md bg-gray-50 sm:h-16 sm:w-16 lg:h-24 lg:min-h-0 lg:w-24 2xl:h-36 2xl:w-36"
									src={
										typeof game.team2?.image === "string"
											? game.team2.image
											: undefined
									}
									alt=""
								/>
							)}
						{game.team1.image?.length - 2 > 0 && (
							<div className="relative z-0 inline-block flex h-[35px] w-[35px] items-center justify-center rounded-full bg-slate-50 ring-2 ring-white">
								+{game.team1.image?.length - 2}
							</div>
						)}
					</div>
					<div className="flex flex-col justify-center">
						<p className="p-2 text-center text-xs font-semibold lg:text-sm">
							{game.team1?.lastName}
						</p>
						<div className="flex items-center justify-center">
							<XSGrayMaetIcon />
							<p className="ml-1 text-xs text-gray-500">
								{Math.round(
									game.team1?.rating?.displayRating || 100
								)}
							</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-start gap-8">
					<div className="flex min-w-full items-center justify-center">
						<div className="flex flex-col">
							<div className="min-w-full flex-row lg:w-32">
								<div className="col-span-2 mt-1 grid grid-cols-1 items-center">
									{gameStatus !== "unreported" ? (
										<div className="col-span-1 mt-1 flex items-center justify-start">
											{gameStatus === "team1-winner" ? (
												<div className="col-span-1 flex items-center justify-start">
													<FaPlay className="mr-1" />
													<p className="font-bold lg:text-xl">
														{game.team1?.points}
													</p>
												</div>
											) : (
												<p className="lg:text-xl">
													{game.team1?.points}
												</p>
											)}
										</div>
									) : (
										<div className="inline-flex h-14 w-24 items-center justify-center self-center rounded-2xl bg-zinc-100 py-3">
											<text
												aria-label="Versus"
												className="h-7 w-28 text-center text-3xl font-bold leading-tight tracking-tight text-black"
											>
												VS
											</text>
										</div>
									)}
									{gameStatus !== "unreported" ? (
										<div className="col-span-1 mt-1 flex items-center justify-end">
											{gameStatus === "team2-winner" ? (
												<div className="col-span-1 flex items-center">
													<FaPlay className="mr-1" />
													<p className="font-bold lg:text-xl">
														{game.team2?.points}
													</p>
												</div>
											) : (
												<div className="col-span-1 flex items-center">
													<p className="lg:text-xl">
														{game.team2?.points}
													</p>
												</div>
											)}
										</div>
									) : (
										<div></div>
									)}
								</div>
								<div className="mt-2 flex h-6 items-center justify-center lg:mt-6">
									{gameStatus ? (
										<div className="flex h-6 min-w-full items-center justify-center rounded-full bg-green-300 p-2 text-xs">
											<p>Verified</p>
										</div>
									) : (
										<div className="flex h-6 min-w-full items-center justify-center rounded-full bg-blue-200 p-2 text-xs">
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
				<div className="flex flex-col items-center justify-center">
					{game.team2?.image ? (
						<NextImage
							className="h-12 w-12 flex-none rounded-md bg-gray-50 sm:h-16 sm:w-16 lg:h-24 lg:min-h-0 lg:w-24 2xl:h-36 2xl:w-36"
							src={
								typeof game.team2.image === "string"
									? game.team2.image
									: undefined
							}
							alt=""
						/>
					) : (
						<div className="flex h-24 w-24 rounded-md bg-gradient-to-b from-gradientYellow via-gradientOrange to-gradientBlue"></div>
					)}
					<div className="flex flex-col justify-center">
						<p className="p-2 text-center text-xs font-semibold lg:text-sm">
							{game.team2?.lastName}
						</p>
						<div className="flex items-center justify-center">
							<XSGrayMaetIcon />
							<p className="ml-1 text-xs text-gray-500">
								{Math.round(
									game.team2?.rating?.displayRating || 100
								)}
							</p>
						</div>
					</div>
				</div>
			</section>
			{/* win prob / points won/lost section */}
			<section className="flex-col">
				<div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
					<div
						style={{ width: "45%" }}
						className="h-2.5 rounded-full bg-red-300"
					></div>
				</div>
				<div className="flex flex-row justify-between">
					<p className="h-6 w-11 text-sm font-bold leading-tight tracking-tight text-black">
						32%
					</p>
					<p className="h-6 w-56 text-center text-sm font-normal leading-tight tracking-tight text-gray-500">
						Win Prob
					</p>
					<p className="h-6 w-11 text-right text-sm font-bold leading-tight tracking-tight text-black">
						68%
					</p>
				</div>
			</section>
		</div>
	);
};
