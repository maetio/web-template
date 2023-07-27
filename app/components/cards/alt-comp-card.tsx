import React from "react";
import {
	FaBasketball,
	FaFutbol,
	FaLocationArrow,
	FaRegCalendar,
	FaVolleyball,
} from "react-icons/fa6";
import { Competition } from "types/index";
import { MdSportsTennis } from "react-icons/md";
import { getShortDateString, showTimeOrDate } from "utils/date";
import { BaseURL } from "config/constants";
import { ProfilesResponseType } from "types/next-api";
import { capitalizeFirstLetter } from "utils/format";
import AltPlayerCard from "./alt-player-card";
import { NextImage } from "app/components/image";
import { CompetitionType } from "app/components/comp-data";
import Link from "next/link";

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
			className="flex flex-col items-start justify-between p-4 transition ease-in-out hover:-translate-y-1 hover:shadow-md duration-300 rounded-lg"
		>
			<div className="relative w-full">
				<NextImage
					size="full"
					src={competition.image}
					alt={competition.name}
					className="aspect-[16/9] w-full rounded-lg bg-gray-100 object-contain sm:aspect-[2/2] lg:aspect-[2/2]"
				/>
				<div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10" />
			</div>
			{/* <NextImage
					size={40}
					src={competition.image}
					alt={competition.name}
					className="aspect-[16/9] w-full rounded-lg bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
				/> */}
			<div className="max-w-xl">
				<div className="mt-8 flex items-center gap-x-4 text-xs">
					<time dateTime={competition.startTimeISO} className="text-gray-500">
						{getShortDateString(new Date(competition.startTimeISO || ""))}
					</time>
					<CompetitionType type={competition.type || "session"} sport={competition.sport || "basketball"} />
				</div>
				<div className="group relative">
					<h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
						{competition.name}
					</h3>
					<p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{competition.description}</p>
				</div>
				<div className="relative mt-8 flex items-center gap-x-4">
					<NextImage src={competition.image} alt={competition.name} className="h-10 w-10 rounded-full bg-gray-100" />
					<div className="text-sm leading-6">
						<p className="font-semibold text-gray-900">
							Host Name
						</p>
						<p className="text-gray-600">13 games</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CompetitionCard;
