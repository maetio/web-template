import React from "react";
import {
	CompProfilesResponseType,
	CompetitionsResponseType,
	PlayersResponseType,
} from "types/next-api";
import { BaseURL } from "config/constants";
import { getUserData } from "server-actions/users";
import { MaetIcon } from "app/components/icons";
import { ActionButton } from "app/components/action-button";
import { CompDisplayData } from "app/components/comp-data";
import { NextImage } from "app/components/image";
import {
	MdArrowForwardIos,
	MdOutlinePlaylistAddCheck,
	MdPeopleOutline,
} from "react-icons/md";
import { averageRatingObjects } from "utils/skill-rating";
import AltPlayerCard from "app/components/cards/alt-player-card";

/**
 * Function will display the competition to the user
 *
 * @export
 * @param {{
 * 	params: { id: string };
 * }} {
 * 	params,
 * }
 * @return {*}
 */
export default async function ViewCompScreen({
	params,
}: {
	params: { id: string };
}) {
	// get the user data
	const user = await getUserData();

	// get competition data
	const competitionResponse = await fetch(
		`${BaseURL}/api/competitions/${params.id}`
	);
	const competitions: CompetitionsResponseType =
		await competitionResponse.json();
	const competitionData = competitions.at(0);

	// get the competition players
	const playersResponse = await fetch(`${BaseURL}/api/players/${params.id}`);
	const players: PlayersResponseType = await playersResponse.json();

	// get the competition teams
	// const teamsResponse = await fetch(`${BaseURL}/api/teams/${params.id}`);
	// const teams: TeamsResponseType = await teamsResponse.json();

	// get if the player has joined the competition
	const compPlayerResponse = await fetch(
		`${BaseURL}/api/comp-player/${params.id}/${user?.id}`
	);
	const compPlayer: CompProfilesResponseType =
		await compPlayerResponse.json();

	// set rank string
	const getRankString = (rank: number) => {
		if (rank === 0) return "1st";
		if (rank === 1) return "2nd";
		if (rank === 2) return "3rd";
		if (rank > 2) return `${rank + 1}th`;
		return "Not Ranked";
	};

	// set parameters for registration
	const registrationOpen =
		competitionData?.startTimeISO &&
		new Date() > new Date(competitionData.startTimeISO);

	return (
		<div className="container mx-auto px-2 sm:px-6 lg:px-8">
			<div className="flex flex-row flex-wrap pb-12 pt-4 lg:flex-nowrap lg:pt-12">
				<div>
					<NextImage size={400} src={competitionData?.image} />
				</div>
				<div className="mt-3 flex flex-col flex-wrap self-center lg:ml-12 lg:mt-0">
					<CompDisplayData
						type={competitionData?.type || "session"}
						sport={competitionData?.sport || "pickleball"}
						startTimeISO={competitionData?.startTimeISO}
						endTimeISO={competitionData?.endTimeISO}
						location={competitionData?.location}
					/>
					<h1 className="my-3 flex flex-wrap text-7xl font-bold">
						{competitionData?.name}
					</h1>
					<p className="flex flex-wrap">
						{competitionData?.description}
					</p>
					<div className="flex flex-row py-12">
						{compPlayer?.rating?.displayRating ? (
							<div className="flex flex-row">
								<NextImage
									size={50}
									src={compPlayer.image}
									alt={compPlayer.firstName}
								/>
								<h3 className="ml-3 self-center font-semibold">
									You are ranked{" "}
									{getRankString(
										players.findIndex(
											(profile) =>
												profile.id === compPlayer.id
										)
									)}{" "}
									of {players.length} total players.
								</h3>
							</div>
						) : (
							<ActionButton
								className="w-auto px-12"
								endIcon={
									<MdArrowForwardIos className="text-white" />
								}
								referRoute={
									user?.id
										? `/join-comp/${competitionData?.id}`
										: `/comp-login/${competitionData?.id}`
								}
								title="Join Competition"
								colorVariant="indigo"
							/>
						)}
					</div>
				</div>
			</div>
			<div className="rounded-lg bg-gray-100 px-6 py-6">
				<h3 className="text-base font-semibold leading-6 text-gray-900">
					Competition Info
				</h3>
				<dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
					<div
						key="number"
						className="flex flex-row overflow-hidden rounded-lg bg-white px-4 py-5 align-middle shadow sm:p-6"
					>
						<MdPeopleOutline className="h-20 w-20 flex-none self-center" />
						<div className="self-center pl-3">
							<dt className="truncate text-sm font-medium text-gray-500">
								Number of Players
							</dt>
							<dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
								{players.length}
							</dd>
						</div>
					</div>
					<div
						key="rating"
						className="flex flex-row overflow-hidden rounded-lg bg-white px-4 py-5 align-middle shadow sm:p-6"
					>
						<MaetIcon className="flex-none self-center" size={20} />
						<div className="self-center pl-3">
							<dt className="truncate text-sm font-medium text-gray-500">
								Average Rating
							</dt>
							<dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
								{Math.round(
									averageRatingObjects(
										players.map((player) => player.rating)
									).displayRating
								)}
							</dd>
						</div>
					</div>
					<div
						key="registration"
						className="flex flex-row overflow-hidden rounded-lg bg-white px-4 py-5 align-middle shadow sm:p-6"
					>
						<MdOutlinePlaylistAddCheck className="h-20 w-20 flex-none self-center" />
						<div className="self-center pl-3">
							<dt className="truncate text-sm font-medium text-gray-500">
								Registration
							</dt>
							<dd
								className={`mt-1 inline-flex items-center rounded-md px-1.5 py-1.5 text-3xl ${
									registrationOpen
										? "bg-green-200 text-green-700"
										: "bg-red-200 text-red-700"
								} font-semibold tracking-tight`}
							>
								• {registrationOpen ? "Open" : "Closed"}
							</dd>
						</div>
					</div>
				</dl>
			</div>
			{/* 3 column wrapper */}
			<div className="mx-auto grid grid-cols-6">
				{/* Left sidebar & main wrapper */}
				<main className="col-span-6 flex-1 overflow-y-auto py-6 lg:col-span-4 border-gray-900/5">
					<h3 className="text-base font-semibold leading-6 text-gray-900">
						Games
					</h3>
				</main>
				<aside className="mt-12 top-8 col-span-6 lg:col-span-2 border border-gray-900/7 rounded-lg">
					{/* Right column area */}
					<h3 className="text-base font-semibold leading-6 text-gray-900 px-4 border-b pb-3 pt-6 bg-gray-100">
						Player Rankings
					</h3>
					<ul
						role="list"
						className="h-96 divide-y divide-gray-100 overflow-y-auto"
					>
						{players.map((player, rank) => (
							<li key={player.id} className="px-5 border-b">
								<AltPlayerCard key={player.id} player={player} ranking={rank} />
							</li>
						))}
					</ul>
				</aside>
			</div>
		</div>
	);
}
