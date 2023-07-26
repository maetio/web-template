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
			<div className="flex items-center justify-center gap-x-4">
				{typeof ranking === "number" ? (
					<div className="flex w-10 flex-col place-items-center">
						<h1 className="flex-none text-xl font-bold">
							{ranking + 1}
						</h1>
						{ranking < 3 ? (
							<div className="flex items-center">
								<FaMedal
									className={`${medalColor[ranking]} text-base md:text-lg`}
								/>
							</div>
						) : null}
					</div>
				) : null}
				<NextImage
					size={50}
					src={player.image}
					alt={player.firstName}
				/>
				<div className="min-w-0 flex-auto">
					<p className="truncate text-sm font-bold leading-6 text-gray-900 dark:text-white">
						{player.firstName}
					</p>
					<p className="truncate text-sm font-bold leading-6 text-gray-900 dark:text-white">
						{player.lastName}
					</p>
				</div>
			</div>
			<div className="relative self-center">
				<dt>
					<div className="absolute rounded-md p-3">
						<MaetIcon size={10} />
					</div>
					<p className="ml-16 justify-center truncate text-sm font-medium text-gray-500 dark:text-white">
						Rating
					</p>
				</dt>
				<dd className="ml-16 flex items-baseline">
					<p className="text-2xl font-semibold text-gray-900 dark:text-white ">
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
		</Link>
	);
};

export default AltPlayerCard;
