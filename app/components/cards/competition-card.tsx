import React from "react";
import { FaBasketball, FaLocationArrow, FaRegCalendar } from "react-icons/fa6";
import { Competition } from "types/index";

export interface CompetitionCardProps extends Omit<
React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>,
"color"
>{
    competition: Partial<Competition>
	price?: string
	width?: number
}

const CompetitionCard: React.FC<CompetitionCardProps> = ({competition, price, width, ...divParams }) => {
	
	return (
		<div {...divParams} className={`border w-${String(width) || "auto" } rounded-md shadow-lg lg:w-2/3 mt-3 p-2 min-w-full`}>
			<div className="grid grid-rows-12 pl-3 pt-3 pr-2">
				<div className="grid row-span-4 grid-cols-12">
					<div className="col-span-2 flex">
						<div className="2xl:w-36 2xl:h-36 lg:h-24 lg:w-24 lg:min-h-0 w-12 h-12 rounded-md bg-gradient-to-b from-gradientYellow via-gradientOrange to-gradientBlue"></div>
					</div>
					<div className="col-span-7 flex-col flex">
						<h2 className="font-bold lg:text-3xl sm:text-lg">{competition.name}</h2>
						<div className="flex-row flex items-center">
							<FaBasketball className="text-gray-400 text-xs lg:text-base" />
							<p className="text-gray-400 ml-2 text-xs lg:text-base">{competition.sport} {competition.type}</p>
						</div>
						<div className="flex-row flex items-center">
							<FaRegCalendar className="text-gray-400 text-xs lg:text-base" />
							<p className="text-gray-400 ml-2 text-xs lg:text-base">{competition.startTimeISO}</p>
						</div>
						{competition.location && 
						<div className="flex-row flex items-center">
							<FaLocationArrow className="text-gray-400 text-xs lg:text-base" />
							<p className="text-gray-400 ml-2 text-xs lg:text-base">{competition.location?.address}</p>
						</div>}
					</div>
					<div className="col-span-3 flex flex-row items-start justify-end">
						<p className="lg:text-2xl text-gray-400 text-xs">$99</p>
						<p className="text-gray-400 ml-1 text-xs lg:text-base">per team</p>
					</div>
				</div>
				<div className="row-span-6 grid grid-cols-12 h-48 items-center mb-4 gap-8">
					<div className="col-span-6 flex flex-col">

					</div>
					<div className="col-span-6 flex flex-col">

					</div>
				</div>
			</div>
		</div>
	);
};

export default CompetitionCard;