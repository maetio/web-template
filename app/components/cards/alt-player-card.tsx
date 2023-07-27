import React from "react";
import { Profile } from "types/index";
import { FaMedal } from "react-icons/fa6";
import Link, { LinkProps } from "next/link";
import { MaetIcon } from "app/components/icons";
import { NextImage } from "app/components/image";

export interface PlayerCardProps extends Omit<LinkProps, "href"> {
	player: Partial<Profile>;
	ranking?: number;
	animate?: boolean;
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
	animate,
	...divParams
}) => {
	return (
		<Link
			href={`/view-profile/${player.userID}/${player.sport}`}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...divParams}
			className="flex h-20 justify-between gap-x-6"
		>
			<div className="flex flex-row items-center justify-start gap-x-4">
				{typeof ranking === "number" ? (
					<div className="grid grid-cols-1 flex-col place-items-center justify-center">
						{ranking < 3 ? (
							<div className="flex flex-col items-center justify-start w-8">
								<h1 className="flex-none text-xl font-bold">
									{ranking + 1}
								</h1>
								<FaMedal
									className={`${medalColor[ranking]} text-base md:text-lg`}
								/>
							</div>
						) : <div className="flex flex-col items-center justify-start w-8">
							<h1 className="flex-none text-xl font-bold">
								{ranking + 1}
							</h1>
						</div>}
					</div>
				) : null}
				<div className="flex justify-center items-center">
					<NextImage
						size={50}
						src={player.image}
						alt={player.firstName}
					/>
				</div>
				<div className="min-w-0 lg:w-24 flex-auto">
					<p className="truncate text-sm font-bold leading-6 text-gray-900 dark:text-white">
						{player.firstName}
					</p>
					<p className="truncate text-sm font-bold leading-6 text-gray-900 dark:text-white">
						{player.lastName}
					</p>
				</div>
			</div>
			<div className="relative self-end w-32 flex flex-row items-center">
				<div className="flex rounded-md p-3">
					<MaetIcon size={10} />
				</div>
				<div className="flex flex-row justify-center">
					<div className="flex flex-col justify-center">
						<p className="truncate text-sm font-medium text-gray-500 dark:text-white">
						Rating
						</p>
						<div className="flex flex-row justify-start self-start">
							<p className="text-2xl font-semibold text-gray-900 dark:text-white ">
								{Math.round(player.rating?.displayRating || 100)}
							</p>
						</div>
						<div className="flex self-start justify-start">
							<p
								className={classNames(
									player?.deltaRating?.displayRating &&
								player?.deltaRating?.displayRating >= 0
										? "text-green-600"
										: "text-red-600",
									"items-baseline text-sm font-semibold"
								)}
							>
								{player?.deltaRating?.displayRating &&
						player?.deltaRating?.displayRating >= 0
									? "+"
									: ""}
								{Math.round(player?.deltaRating?.displayRating || 0)}
							</p>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default AltPlayerCard;
