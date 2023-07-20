import React from "react";
import { Profile } from "types/index";
import { MaetIcon } from "../icons";

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

const AltPlayerCard: React.FC<PlayerCardProps> = ({
	player,
	ranking,
	...divParams
}) => {
	return (
		<div className="flex min-w-full" {...divParams}>
			<div className="flex items-center justify-center gap-x-4">
				<h1 className="flex-none text-xl font-bold">{ranking + 1}</h1>
				<img
					className="h-12 w-12 flex-none rounded-full bg-gray-50"
					src={player.image || undefined}
					alt=""
				/>
				<div className="min-w-0 flex-auto">
					<p className="text-sm font-bold leading-6 text-gray-900 dark:text-white ">
						{player.firstName} {player.lastName}
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
					<p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-white ">
						Rating
					</p>
				</dt>
				<dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
					<p className="text-2xl font-semibold text-gray-900 dark:text-white">
						{Math.round(player.rating?.displayRating || 100)}
					</p>
					<p
						className={classNames(
							player?.deltaRating?.displayRating &&
								player?.deltaRating?.displayRating >= 0
								? "text-green-600"
								: "text-red-600",
							"ml-2 flex items-baseline text-sm font-semibold"
						)}
					>
						{player?.deltaRating?.displayRating &&
						player?.deltaRating?.displayRating >= 0
							? "+"
							: ""}
						{Math.round(player?.deltaRating?.displayRating || 0)}
					</p>
				</dd>
			</div>
		</div>
	);
};

export default AltPlayerCard;
