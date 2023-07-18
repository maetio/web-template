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

	return (
		<main className="mx-10">
			<div className="px-6 py-24 sm:py-32 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
						{competitionData?.name}
					</h2>
					{compPlayer.profileID ? null : (
						// <div className="flex gap-x-4 justify-center align-center">
						// 	<img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={compPlayer?.image} alt="" />
						// 	<div className="min-w-0 flex-auto">
						// 		<p className="text-sm font-bold leading-6 text-gray-900">{compPlayer.firstName} {compPlayer.lastName}</p>
						// 		<div
						// 			className="relative"
						// 		>
						// 			<dt>
						// 				<div className="absolute rounded-md p-3">
						// 					<MaetIcon size={10} />
						// 				</div>
						// 				<p className="ml-16 truncate text-sm font-medium text-gray-500">Rating</p>
						// 			</dt>
						// 			<dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
						// 				<p className="text-2xl font-semibold text-gray-900">{Math.round(compPlayer.rating?.displayRating || 100)}</p>
						// 				<p
						// 					className={classNames(
						// 						compPlayer?.deltaRating?.displayRating && compPlayer?.deltaRating?.displayRating >= 0 ? "text-green-600" : "text-red-600",
						// 						"ml-2 flex items-baseline text-sm font-semibold"
						// 					)}
						// 				>
						// 					{compPlayer?.deltaRating?.displayRating && compPlayer?.deltaRating?.displayRating >= 0 ? "+" : ""}{Math.round(compPlayer?.deltaRating?.displayRating || 0)}
						// 				</p>
						// 			</dd>
						// 		</div>
						// 	</div>
						// </div>
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
				</div>
			</div>
			<ul role="list" className="divide-y divide-gray-100">
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
			{/* <br />
			<br />
			{teams.map((team) => (
				<TeamCard
					key={team.id}
					name={team.lastName}
					score={team.averagePlayerRating?.displayRating}
					ranking={1}
					image={team.image}
				/>
			))}
			<br />
			{players.map((player) => (
				<PlayerCard
					key={player.id}
					name={`${player.firstName} ${player.lastName}`}
					score={player.rating?.displayRating}
					ranking={2}
					image={player.image}
				/>
			))} */}
		</main>
	);
}
