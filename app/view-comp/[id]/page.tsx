import React from "react";
import {
	CompProfilesResponseType,
	CompetitionsResponseType,
	PlayersResponseType,
} from "types/next-api";
import { BaseURL } from "config/constants";
import { getUserData } from "server-actions/users";
import { MaetIcon } from "app/components/icons";
import { SubmitFormActionButton } from "app/components/submit-form-action-button";
import Link from "next/link";
import { CompetitionType } from "app/components/comp-type";
import { NextImage } from "app/components/image";
import { MdOutlinePlaylistAddCheck, MdPeopleOutline } from "react-icons/md";
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

	// define medal colors

	// set parameters for registration
	const registrationOpen =
		competitionData?.startTimeISO &&
		new Date() > new Date(competitionData.startTimeISO);

	return (
		<div className="container mx-auto sm:px-6 lg:px-8">
			<div className="flex flex-row py-12">
				<div className="flex w-1/3 self-center">
					<NextImage size={500} src={competitionData?.image} />
				</div>
				<div className="ml-12 flex flex-col self-center">
					<h1 className="text-7xl font-bold">
						{competitionData?.name}
					</h1>
					<CompetitionType
						className="my-3"
						type={competitionData?.type || "session"}
						sport={competitionData?.sport || "pickleball"}
					/>
					{/* <p className="mt-1">
						Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam expedita quia omnis voluptatem. Minus
						quidem ipsam quia iusto.
					</p> */}
				</div>
			</div>
			<div>
				<h3 className="text-base font-semibold leading-6 text-gray-900">
					Competition Info
				</h3>
				<dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
					<div
						key="number"
						className="flex flex-row overflow-hidden rounded-lg bg-white px-4 py-5 align-middle shadow sm:p-6"
					>
						<MdPeopleOutline className="h-20 w-20 self-center" />
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
						<MaetIcon className="self-center" size={20} />
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
						<MdOutlinePlaylistAddCheck className="h-20 w-20 self-center" />
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
				<main className="col-span-6 flex-1 overflow-y-auto lg:col-span-4"></main>
				<aside className="sticky top-8 col-span-6 lg:col-span-2">
					{/* Right column area */}
					{compPlayer.profileID ? null : (
						<div className="w-50 mt-20 justify-center">
							<SubmitFormActionButton
								icon="none"
								referRoute={
									user?.id
										? `/join-comp/${competitionData?.id}`
										: `/comp-login/${competitionData?.id}`
								}
								title="Join Competition"
								colorVariant="indigo"
							/>
						</div>
					)}
					
					{players.map((player, rank) => (
						<Link key={player.id} href={`/view-profile/${player.userID}/${player.sport}`}>
							<AltPlayerCard player={player} ranking={rank} />
						</Link>	
					))}
				</aside>
			</div>
		</div>
	);
}
