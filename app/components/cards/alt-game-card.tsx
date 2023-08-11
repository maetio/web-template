import React from "react";
import { FaPlay } from "react-icons/fa6";
import { inferGameStatus } from "utils/skill-rating";
import { BaseURL } from "config/constants";
// import { GameResponseType } from "types/next-api";
import { GameResponseType } from "types/next-api";
import { getShortDateString, getTimeString } from "utils/date";
import { NextImage } from "app/components/image";
import { WinProb } from "app/components/data-display/win-probability";
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

	// get game status
	const gameStatus = inferGameStatus(game.team1?.points, game.team2?.points);

	console.log("game uud", game.id);

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
			<section className=" mb-1 flex flex-row justify-evenly py-2">
				<div className="flex flex-col items-center justify-center">
					<div className=" isolate flex flex overflow-hidden">
						{game &&
						game.team1?.image &&
						typeof game.team1?.image !== "string" ? (
								game.team1.image.slice(0, 1).map((img, index) => (
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
										typeof game.team1?.image === "string"
											? game.team1.image
											: undefined
									}
									alt=""
								/>
							)}
						{game.team1?.image &&
							typeof game.team1.image !== "string" &&
							game.team1.image?.length - 2 > 0 && (
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
						{gameStatus !== "unreported" ? (
							<div className="flex  items-center justify-center rounded-2xl bg-zinc-100 p-3.5">
								<div className="flex  items-center justify-center text-center">
									<p className="text-1xl md:text-3xl font-bold leading-tight tracking-tight text-gray-500 ">
										<span
											className={
												gameStatus === "team1-winner"
													? "font-bold text-black"
													: ""
											}
										>
											12
										</span>{" "}
										:{" "}
										<span
											className={
												gameStatus === "team2-winner"
													? "font-bold text-black"
													: ""
											}
										>
											10
										</span>
									</p>
								</div>
							</div>
						) : (
							<div className="inline-flex items-center justify-center self-center rounded-2xl bg-zinc-100 px-6 p-3.5">
								<text
									aria-label="Versus"
									className="text-1xl md:text-3xl text-center font-bold leading-tight tracking-tight text-black"
								>
									VS
								</text>
							</div>
						)}
					</div>
				</div>
				<div className="flex flex-col items-center justify-center">
					<div className=" isolate flex flex overflow-hidden">
						{game &&
						game.team2?.image &&
						typeof game.team2?.image !== "string" ? (
								game.team2.image.slice(0, 1).map((img, index) => (
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
						{game.team2?.image &&
							typeof game.team2.image !== "string" &&
							game.team2.image?.length - 2 > 0 && (
							<div className="relative z-0 inline-block flex h-[35px] w-[35px] items-center justify-center rounded-full bg-slate-50 ring-2 ring-white">
									+{game.team2.image?.length - 2}
							</div>
						)}
					</div>

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

			{/* win prob */}
			{game.team1?.rating && game.team2?.rating && (
				<WinProb
					team1Rating={game.team1?.rating}
					team2Rating={game.team2?.rating}
				/>
			)}

			{/* win prob end */}
		</div>
	);
};
