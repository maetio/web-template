import React from "react";
import { Profile } from "types/index";
import { FaMedal } from "react-icons/fa6";
import { MaetIcon } from "../icons";
import { NextImage } from "../image";

export interface PlayerCardProps
	extends Omit<
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		>,
		"color"
	> {
	player: Partial<Profile>;
	ranking: number;
}

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

// define medal colors
const medalColor: string[] = [
	"text-yellow-400",
	"text-gray-400",
	"text-amber-700",
];

const AltPlayerCard: React.FC<PlayerCardProps> = ({
	player,
	ranking,
	...divParams
}) => {
	return (
		<div className="flex justify-between gap-x-6 py-5 h-20 border-b">
			<div className="items-center flex justify-center gap-x-4">
				{ranking < 3 ? (
					<div className="grid grid-cols-2 gap-x-2 items-center justify-end">
						<div className="flex col-span-1">
							<FaMedal
								className={`${medalColor[ranking]} text-base md:text-lg`}
							/>
						</div>
						<h1 className="flex-none text-xl font-bold">
							{ranking + 1}
						</h1>
					</div>
				) : (
					<div className="grid grid-cols-2 gap-x-2 items-center justify-end">
						<div className="flex col-span-1">
						</div>
						<div className="flex col-span-1">
							<h1 className="flex-none text-xl font-bold">
								{ranking + 1}
							</h1>
						</div>
						
					</div>
				)}
				<NextImage
					size={50}
					src={player.image}
					alt={player.firstName}
				/>
				<div className="min-w-0 flex-auto">
					<p className="text-sm font-bold leading-6 text-gray-900 dark:text-white ">
						{player.firstName}{" "}
						{player.lastName}
					</p>
					<p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-white ">
						{player.type}
					</p>
				</div>
			</div>
			<div className="relative">
				<dt>
					<div className="absolute rounded-md p-3">
						<MaetIcon size={10} />
					</div>
					<p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-white justify-center">
                Rating
					</p>
				</dt>
				<dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
					<p className="text-2xl font-semibold text-gray-900 dark:text-white ">
						{Math.round(
							player.rating?.displayRating ||
                        100
						)}
					</p>
					<p
						className={classNames(
							player?.deltaRating
								?.displayRating &&
                        player?.deltaRating
                        	?.displayRating >= 0
								? "text-green-600"
								: "text-red-600",
							"ml-2 flex items-baseline text-sm font-semibold"
						)}
					>
						{player?.deltaRating
							?.displayRating &&
                player?.deltaRating
                	?.displayRating >= 0
							? "+"
							: ""}
						{Math.round(
							player?.deltaRating
								?.displayRating || 0
						)}
					</p>
				</dd>
			</div>
		</div>
	);
};

export default AltPlayerCard;
