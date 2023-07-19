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
import { MdFeaturedPlayList, MdOutlinePlaylistAddCheck, MdPeople, MdPeopleOutline } from "react-icons/md";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

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

	// set parameters for registration
	const registrationOpen = competitionData?.startTimeISO && new Date() > new Date(competitionData.startTimeISO);

	return (
		<div className="container mx-auto sm:px-6 lg:px-8">
			<div className="py-12 flex flex-row">
				<div className="w-1/3 flex self-center">
					<NextImage size={500} src={competitionData?.image} />
				</div>
				<div className="ml-12 flex flex-col self-center">
					<h1 className="text-7xl font-bold">{competitionData?.name}</h1>
					<CompetitionType className="my-3" type={competitionData?.type || "session"} sport={competitionData?.sport || "pickleball"} />
					{/* <p className="mt-1">
						Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam expedita quia omnis voluptatem. Minus
						quidem ipsam quia iusto.
					</p> */}
				</div>
			</div>
			<div>
				<h3 className="text-base font-semibold leading-6 text-gray-900">Competition Info</h3>
				<dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
					<div key="number" className="flex flex-row align-middle overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
						<MdPeopleOutline className="self-center h-20 w-20" />
						<div className="self-center pl-3">
							<dt className="truncate text-sm font-medium text-gray-500">Number of Players</dt>
							<dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{players.length}</dd>
						</div>
					</div>
					<div key="rating" className="flex flex-row align-middle overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
						<MaetIcon className="self-center" size={20} />
						<div className="self-center pl-3">
							<dt className="truncate text-sm font-medium text-gray-500">Average Rating</dt>
							<dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{500}</dd>
						</div>
					</div>
					<div key="registration" className="flex flex-row align-middle overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
						<MdOutlinePlaylistAddCheck className="self-center h-20 w-20" />
						<div className="self-center pl-3">
							<dt className="truncate text-sm font-medium text-gray-500">Registration</dt>
							<dd className={`mt-1 text-3xl inline-flex items-center rounded-md px-1.5 py-1.5 ${registrationOpen ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"} font-semibold tracking-tight`}>• {registrationOpen ? "Open" : "Closed"}</dd>
						</div>
					</div>
				</dl>
			</div>
			{/* 3 column wrapper */}
			<div className="mx-auto grid grid-cols-6">
				{/* Left sidebar & main wrapper */}
				<main className="flex-1 col-span-6 lg:col-span-4 overflow-y-auto">
					
				</main>
				<aside className="col-span-6 lg:col-span-2 sticky top-8">
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
					<ul role="list" className="divide-y divide-gray-100 sticky top-0">
						{players.map((player, rank) => (
							<li
								key={player.id}
								className="flex justify-between gap-x-6 py-5"
							>
								<Link href={`/view-profile/${player.userID}/${player.sport}`}>
									<div className="align-center flex justify-center gap-x-4">
										<h1 className="flex-none text-xl font-bold">
											{rank + 1}
										</h1>
										<NextImage width={50} height={50} src={player.image} alt={player.firstName} />
										<div className="min-w-0 flex-auto">
											<p className="text-sm font-bold leading-6 text-gray-900 dark:text-white ">
												{player.firstName} {player.lastName}
											</p>
											<p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-white ">
												{player.type}
											</p>
										</div>
									</div>
								</Link>
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
										<p className="text-2xl font-semibold text-gray-900 dark:text-white ">
											{Math.round(
												player.rating?.displayRating || 100
											)}
										</p>
										<p
											className={classNames(
												player?.deltaRating?.displayRating &&
												player?.deltaRating
													?.displayRating >= 0
													? "text-green-600"
													: "text-red-600",
												"ml-2 flex items-baseline text-sm font-semibold"
											)}
										>
											{player?.deltaRating?.displayRating &&
										player?.deltaRating?.displayRating >= 0
												? "+"
												: ""}
											{Math.round(
												player?.deltaRating?.displayRating || 0
											)}
										</p>
									</dd>
								</div>
							</li>
						))}
					</ul>
				</aside>
			</div>
		</div>
	);
}
