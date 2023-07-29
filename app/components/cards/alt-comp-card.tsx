import React from "react";
import { Competition } from "types/index";
import { getFullDateString } from "utils/date";
import { NextImage } from "app/components/image";
import { CompetitionType } from "app/components/comp-data";
import { BaseURL } from "config/constants";
import { PlayerResponseType } from "types/next-api";

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
	// get host profile data
	const profileResponse = await fetch(
		`${BaseURL}/api/profile/${competition.hostID}`
	);
	const hostData: PlayerResponseType = await profileResponse.json();

	return (
		<div
			{...divParams}
			className="col-span-1 flex flex-col items-start justify-between rounded-lg p-4 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md"
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
					<time
						dateTime={competition.startTimeISO}
						className="text-gray-500"
					>
						{getFullDateString(
							new Date(competition.startTimeISO || "")
						)}{" "}
						-{" "}
						{getFullDateString(
							new Date(competition.endTimeISO || "")
						)}
					</time>
					<CompetitionType
						className="z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600"
						type={competition.type || "session"}
						sport={competition.sport || "basketball"}
					/>
				</div>
				<div className="group relative">
					<h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
						{competition.name}
					</h3>
					<p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
						{competition.description}
					</p>
				</div>
				<div className="mt-8 flex w-full items-end justify-between">
					<div className="relative flex items-center gap-x-4">
						<NextImage
							src={hostData.image}
							alt={hostData.firstName?.at(0)}
							className="h-10 w-10 rounded-lg bg-gray-100"
						/>
						<div className="text-sm leading-6">
							<p className="truncate text-sm font-semibold text-gray-900">
								{hostData.firstName} {hostData.lastName}
							</p>
							<p className="truncate text-sm text-gray-600">
								{hostData.rating?.numGames}
							</p>
						</div>
					</div>
					<div className="flex">
						<p className="inline text-sm text-gray-600">
							<p className="inline text-sm font-semibold text-gray-800">
								${Number(competition.price) / 100}
							</p>{" "}
							player
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CompetitionCard;
