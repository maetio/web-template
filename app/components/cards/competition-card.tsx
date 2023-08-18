import React from "react";
import {
	FaBasketball,
	FaFutbol,
	FaLocationArrow,
	FaRegCalendar,
	FaVolleyball,
} from "react-icons/fa6";
import { MdSportsTennis } from "react-icons/md";
import { Competition } from "types/index";
import { showTimeOrDate } from "utils/date";
import { BaseURL } from "config/constants";
import { ProfilesResponseType } from "types/next-api";
import { capitalizeFirstLetter } from "utils/format";
import { NextImage } from "app/components/image";
import AltPlayerCard from "./alt-player-card";

export interface CompetitionCardProps
	extends Omit<
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		>,
		"color"
	> {
	competition: Partial<Competition>;
	price?: string;
	width?: number;
	num?: number;
}
export /**
 * Async function that displays competition information as a card
 * @export
 * @param {CompetitionCardProps} {competition, price, width, ...divParams }
 * @returns
 */
const CompetitionCard: React.FC<CompetitionCardProps> = async ({
	competition,
	price,
	width,
	num,
	...divParams
}) => {
	// get the top [num] players for a competition
	const topPlayersResponse = await fetch(
		`${BaseURL}/api/players/${competition.id}/${num || 2}`
	);
	const topPlayers: ProfilesResponseType = await topPlayersResponse.json();

	const SportIcons: Record<Competition["sport"], React.ReactElement> = {
		basketball: (
			<FaBasketball className="text-xs text-gray-400 lg:text-base" />
		),
		soccer: <FaFutbol className="text-xs text-gray-400 lg:text-base" />,
		volleyball: (
			<FaVolleyball className="text-xs text-gray-400 lg:text-base" />
		),
		pickleball: (
			<MdSportsTennis className="text-xs text-gray-400 lg:text-base" />
		),
	};

	return (
		<div
			{...divParams}
			className={`border w-${
				String(width) || "auto"
			} mt-3 h-auto min-w-full rounded-md p-2 shadow-lg lg:w-2/3`}
		>
			<div className="grid-rows-12 grid h-auto pl-3 pr-2 pt-3">
				<div className="row-span-4 grid grid-cols-12">
					<div className="col-span-2 flex">
						{competition.image ? (
							<NextImage
								className="h-12 w-12 flex-none rounded-md bg-gray-50 sm:h-16 sm:w-16 lg:h-24 lg:min-h-0 lg:w-24 2xl:h-36 2xl:w-36"
								src={competition.image || undefined}
								alt=""
							/>
						) : (
							<div className="h-12 w-12 rounded-md bg-gradient-to-b from-gradientYellow via-gradientOrange to-gradientBlue sm:h-16 sm:w-16 lg:h-24 lg:min-h-0 lg:w-24 2xl:h-36 2xl:w-36"></div>
						)}
					</div>
					<div className="col-span-7 flex flex-col">
						<h2 className="font-bold sm:text-lg lg:text-3xl">
							{competition.name}
						</h2>
						<div className="flex flex-row items-center">
							{competition.sport
								? SportIcons[competition.sport]
								: null}
							<p className="ml-2 text-xs text-gray-400 lg:text-base">
								{capitalizeFirstLetter(competition.sport)}{" "}
								{capitalizeFirstLetter(competition.type)}
							</p>
						</div>
						<div className="flex flex-row items-center">
							<FaRegCalendar className="text-xs text-gray-400 lg:text-base" />
							<p className="ml-2 text-xs text-gray-400 lg:text-base">
								{showTimeOrDate(
									new Date(competition.startTimeISO || "")
								)}
							</p>
						</div>
						{competition.location?.address && (
							<div className="flex flex-row items-center">
								<FaLocationArrow className="text-xs text-gray-400 lg:text-base" />
								<p className="ml-2 text-xs text-gray-400 lg:text-base">
									{competition.location?.address}
								</p>
							</div>
						)}
					</div>
					<div className="col-span-3 flex flex-row items-start justify-end">
						{competition.price ? (
							<div className="flex">
								<p className="text-xs text-gray-400 lg:text-2xl">
									${competition.price}
								</p>
								<p className="ml-1 text-xs text-gray-400 lg:text-base">
									per team
								</p>
							</div>
						) : (
							<div className="flex">
								<p className="text-xs text-gray-400 lg:text-2xl">
									Free
								</p>
							</div>
						)}
					</div>
				</div>
				<div className="row-span-6 mb-4 grid h-48 grid-cols-12 items-center gap-8">
					<div className="col-span-12 flex h-auto flex-col">
						<ul>
							{topPlayers.map((player, rank) => (
								<li key={player.id}>
									<AltPlayerCard
										player={player}
										ranking={rank}
									/>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CompetitionCard;
