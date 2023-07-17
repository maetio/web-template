import React from "react";
import { FaBasketball, FaLocationArrow, FaRegCalendar } from "react-icons/fa6";
import { Competition } from "types/competition";
import { TeamCard } from "./team-card";
import { PlayerCard } from "./player-card";

export interface CompetitionCardProps
	extends Omit<
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		>,
		"color"
	> {
	competitionName?: string;
	sport?: string;
	competitionType?: string;
	competitionStart?: string;
	location?: string;
	price?: string;
	width?: number;
	competition?: Partial<Competition>;
}

const CompetitionCard: React.FC<CompetitionCardProps> = ({
	competitionName,
	sport,
	competitionType,
	competitionStart,
	location,
	price,
	width,
	competition,
	...divParams
}) => {
	return (
		<div
			{...divParams}
			className={`border w-${
				String(width) || "auto"
			} mt-3 min-w-full rounded-md p-2 shadow-lg lg:w-2/3`}
		>
			<div className="grid-rows-12 grid pl-3 pr-2 pt-3">
				<div className="row-span-4 grid grid-cols-12">
					<div className="col-span-2 flex">
						<div className="h-20 w-20 rounded-md bg-gradient-to-b from-gradientYellow via-gradientOrange to-gradientBlue md:h-24 md:w-24 lg:min-h-0 2xl:h-36 2xl:w-36"></div>
					</div>
					<div className="col-span-7 flex flex-col">
						<h2 className="font-bold sm:text-lg lg:text-3xl">
							{competition?.name}
						</h2>
						<div className="flex flex-row items-center">
							<FaBasketball className="text-xs text-gray-400 lg:text-base" />
							<p className="ml-2 text-xs text-gray-400 lg:text-base">
								{sport} {competitionType}
							</p>
						</div>
						<div className="flex flex-row items-center">
							<FaRegCalendar className="text-xs text-gray-400 lg:text-base" />
							<p className="ml-2 text-xs text-gray-400 lg:text-base">
								{competitionStart}
							</p>
						</div>
						<div className="flex flex-row items-center">
							<FaLocationArrow className="text-xs text-gray-400 lg:text-base" />
							<p className="ml-2 text-xs text-gray-400 lg:text-base">
								{location}
							</p>
						</div>
					</div>
					<div className="col-span-3 flex flex-row items-start justify-end">
						<p className="text-xs text-gray-400 lg:text-2xl">$99</p>
						<p className="ml-1 text-xs text-gray-400 lg:text-base">
							per team
						</p>
					</div>
				</div>
				<div className="row-span-6 mb-4 grid h-48 grid-cols-12 items-center gap-8">
					<div className="col-span-6 flex flex-col">
						<TeamCard name="Team Name" rating={99} ranking={1} />
						<TeamCard name="Team Name" rating={99} ranking={2} />
						<TeamCard name="Team Name" rating={99} ranking={3} />
					</div>
					<div className="col-span-6 flex flex-col">
						<PlayerCard
							name="Player Name"
							rating={99}
							ranking={1}
						/>
						<PlayerCard
							name="Player Name"
							rating={99}
							ranking={2}
						/>
						<PlayerCard
							name="Player Name"
							rating={99}
							ranking={3}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CompetitionCard;
