import React from "react";
import { Profile } from "types/index";
import Link, { LinkProps } from "next/link";
import { MaetIcon } from "app/components/icons";
import { NextImage } from "app/components/image";

export interface PlayerCardProps extends Omit<LinkProps, "href"> {
	player: Partial<Profile>;
	ranking?: number;
	animate?: boolean;
	host?: boolean;
	blur?: boolean;
}

export const PlayerRatingCard: React.FC<PlayerCardProps> = ({
	player,
	ranking,
	animate,
	host,
	blur,
	...divParams
}) => {
	console.log("host info", player);
	return (
		<Link
			href={blur ? "" : `/view-profile/${player.userID}/${player.sport}`}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...divParams}
			className={`flex justify-between ${blur && "blur-sm"}`}
		>
			<div className="flex items-center justify-center gap-x-2.5">
				{typeof ranking === "number" ? (
					<div className="flex w-10 flex-col place-items-center">
						<h1 className="flex-none text-xl font-bold">
							{ranking + 1}
						</h1>
					</div>
				) : null}
				<NextImage
					size={50}
					className="rounded-full"
					src={player.image}
					alt="player profile picture"
				/>
				<div className="min-w-0 flex-auto">
					<p className="truncate text-sm font-bold leading-6 text-gray-900 dark:text-white">
						{player.firstName} {player.lastName}
					</p>
				</div>
			</div>
			{!host ? (
				<div className="flex items-center">
					<div className="rounded-md ">
						<MaetIcon />
					</div>

					<p className="text-2xl font-semibold text-gray-900 dark:text-white ">
						{Math.round(player.rating?.displayRating || 100)}
					</p>
				</div>
			) : null}
		</Link>
	);
};
