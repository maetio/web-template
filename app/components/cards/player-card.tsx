import React from "react";
import { Profile } from "types/index";
import Link, { LinkProps } from "next/link";
import { XSMaetIcon } from "app/components/icons";
import { NextImage } from "app/components/image";
import { LuStars } from "react-icons/lu";

export interface PlayerCardProps extends Omit<LinkProps, "href"> {
	player: Partial<Profile>;
	ranking?: number;
	host?: boolean;
	animate?: boolean;
	pointsAwarded?: number;
	compPointsAwarded?: number;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
	player,
	ranking,
	host,
	animate,
	pointsAwarded,
	compPointsAwarded,
	...divParams
}) => {
	return (
		<Link
			href={`/view-profile/${player.userID}/${player.sport}`}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...divParams}
			className="flex w-full justify-between gap-x-6"
		>
			<div className="flex items-center justify-center gap-x-4">
				{typeof ranking === "number" ? (
					<div className="flex w-10 flex-col place-items-center">
						<h1 className="flex-none text-xl font-bold">
							{ranking + 1}
						</h1>
					</div>
				) : null}
				<NextImage
					size={host ? 40 : 50}
					className="rounded-full"
					src={player.image}
					alt="player profile picture"
				/>
				{compPointsAwarded ? (
					<div className="flex flex-col items-start">
						<p className="truncate text-sm font-bold leading-6 text-gray-900 dark:text-white">
							{player.firstName} {player.lastName}
						</p>
						<div className="flex gap-1">
							<XSMaetIcon />
							<p className="text-xs font-semibold text-gray-900 dark:text-white ">
								{Math.round(
									player.rating?.displayRating || 100
								)}
							</p>
							{pointsAwarded ? (
								<p
									className={`text-xs ${
										pointsAwarded > 0
											? "text-green-600"
											: "text-red-600"
									}`}
								>
									{`${
										pointsAwarded > 0 ? "+" : "-"
									}${pointsAwarded}`}
								</p>
							) : null}
						</div>
					</div>
				) : null}
			</div>
			{!compPointsAwarded ? (
				<div className="flex flex-col items-end">
					<p className="truncate text-sm font-bold leading-6 text-gray-900 dark:text-white">
						{player.firstName} {player.lastName}
					</p>
					<div className="flex gap-1">
						<XSMaetIcon />
						<p className="text-xs font-semibold text-gray-900 dark:text-white ">
							{Math.round(player.rating?.displayRating || 100)}
						</p>
						{pointsAwarded ? (
							<p
								className={`text-xs ${
									pointsAwarded > 0
										? "text-green-600"
										: "text-red-600"
								}`}
							>
								{`${
									pointsAwarded > 0 ? "+" : "-"
								}${pointsAwarded}`}
							</p>
						) : null}
					</div>
				</div>
			) : null}

			{compPointsAwarded ? (
				<div className="flex">
					<LuStars />
					<div>
						<p>Competitions Points</p>
					</div>
				</div>
			) : null}
		</Link>
	);
};
