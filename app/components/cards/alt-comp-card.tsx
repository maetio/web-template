import React from "react";
import { Competition } from "types/index";
import { getFullDateString } from "utils/date";
import { NextImage } from "app/components/image";
import { CompetitionType } from "app/components/comp-data";

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
	return (
		<div
			{...divParams}
			className="flex flex-col items-start justify-between p-4 transition ease-in-out hover:-translate-y-1 hover:shadow-md duration-300 rounded-lg col-span-1"
		>
			<div className="relative w-full">
				<NextImage
					src={competition.image}
					alt={competition.name?.at(0)}
					className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
				/>
				<div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
			</div>
			<div className="w-full">
				<div className="mt-8 flex items-center gap-x-4 text-xs">
					<time dateTime={competition.startTimeISO} className="text-gray-500">
						{getFullDateString(new Date(competition.startTimeISO || ""))} - {getFullDateString(new Date(competition.endTimeISO || ""))}
					</time>
					<CompetitionType className="z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600" type={competition.type || "session"} sport={competition.sport || "basketball"} />
				</div>
				<div className="group relative">
					<h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
						{competition.name}
					</h3>
					<p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{competition.description}</p>
				</div>
				<div className="flex mt-8 w-full justify-between items-end">
					<div className="relative flex items-center gap-x-4">
						<NextImage src={competition.image} alt={competition.name?.at(0)} className="h-10 w-10 rounded-full bg-gray-100" />
						<div className="text-sm leading-6">
							<p className="font-semibold text-gray-900 text-sm truncate">
								Host Name
							</p>
							<p className="text-gray-600 text-sm truncate">13 games</p>
						</div>
					</div>
					<div className="flex">
						<p className="text-gray-600 inline text-sm"><p className="text-gray-800 font-semibold inline text-sm">${Number(competition.price)/100}</p> player</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CompetitionCard;
