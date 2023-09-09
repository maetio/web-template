import React from "react";
import {
	CompetitionsResponseType,
	PlayerResponseType,
	PlayersResponseType,
} from "types/next-api";
import { BaseURL } from "config/constants";
import { CompDisplayData } from "app/components/comp-data";
import { NextImage } from "app/components/image";
import { RatedCompetitionCard } from "app/components/cards";
import { SimpleMap } from "app/components/layout/map";
import { MdLocationOn } from "react-icons/md";
import { GamesCardList } from "app/components/pagination/games-card-list";
import { PlayerCardList } from "app/components/pagination/profile-card-list";
import { gamesCollection } from "config/server";
import { Timestamp } from "firebase-admin/firestore";
import { PlayerRatingCard } from "app/components/cards/player-rating-card";
import { ActionButton } from "app/components/action-button";
import { getUserData } from "server-actions/users";

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

	const profileResponse = await fetch(
		`${BaseURL}/api/user-data/${competitionData?.hostID}`
	);
	const hostData: PlayerResponseType = await profileResponse.json();

	const startDate = new Date(0);
	const startTimestamp = Timestamp.fromDate(startDate);

	// set the end timestamp to 100 years in the future from today
	const futureDate = new Date();
	futureDate.setFullYear(futureDate.getFullYear() + 100);
	const endTimestamp = Timestamp.fromDate(futureDate);

	const gameCountRef = await gamesCollection
		.where("competitionID", "==", params.id)
		.where("startTimestamp", ">=", startTimestamp)
		.where("startTimestamp", "<", endTimestamp)
		.count()
		.get();

	const gameCount = gameCountRef.data().count;

	return (
		<main className="w-full min-w-full">
			<div className="w-full lg:flex lg:flex-row lg:gap-2.5">
				<div className="lg:sticky lg:top-20 lg:h-full">
					{/* Competition image and name banner */}
					<section className="mt-2.5 flex h-fit w-full flex-col flex-wrap md:flex-row md:flex-nowrap md:gap-2.5 lg:flex-col">
						<div className="self-center md:flex lg:hidden">
							<NextImage
								size={400}
								src={competitionData?.image}
								alt={`${competitionData?.name} profile`}
							/>
						</div>
						<div className="hidden lg:flex">
							<NextImage
								size={600}
								src={competitionData?.image}
								alt={`${competitionData?.name} profile`}
							/>
						</div>
						{/* name and host section */}
						<div className="flex w-full flex-col justify-center gap-2.5">
							<section className="mt-2.5 flex h-full w-full flex-col flex-wrap self-center rounded-2xl bg-white p-4 md:mt-0">
								<h1 className="flex flex-wrap text-3xl font-bold lg:text-4xl">
									{competitionData?.name}
								</h1>
								{/* <PlayerCard host player={hostData} /> */}
								<PlayerRatingCard host player={hostData} />
							</section>
							<RatedCompetitionCard joinable={false} />
						</div>
					</section>

					<section className="mt-2.5 rounded-2xl bg-white p-4">
						<h6 className="font-bold">Competition Info</h6>
						<CompDisplayData
							className="mt-5"
							type={competitionData?.type || "session"}
							sport={competitionData?.sport || "pickleball"}
							startTimeISO={competitionData?.startTimeISO}
							endTimeISO={competitionData?.endTimeISO}
							location={competitionData?.location}
						/>
					</section>
					{/* signup */}

					{competitionData?.price ? (
						<section className="fixed bottom-0 left-0 right-0 z-10 mt-2.5 flex w-full items-center justify-between bg-white p-4 lg:relative lg:rounded-2xl">
							<div>
								<h4 className="text-xl font-bold leading-tight tracking-tight text-black">
									${competitionData.price / 100}
								</h4>
								{competitionData?.startTimeISO && (
									<p className="text-sm">
										Registration closes on
										{new Date(
											competitionData.startTimeISO
										).toLocaleDateString()}{" "}
										at{" "}
										{new Date(
											competitionData.startTimeISO
										).toLocaleTimeString()}
									</p>
								)}
							</div>
							<ActionButton
								className="h-10 w-28 gap-2.5 rounded-lg p-2.5"
								// disabled={
								// 	(competitionData?.maxPlayers &&
								// 		competitionData?.maxPlayers <=
								// 			players.length) ||
								// 	!competitionData?.registrationOpen
								// }
								referRoute={
									user?.id
										? `/join-comp/${competitionData?.id}`
										: `/comp-login/${competitionData?.id}`
								}
								title={
									(competitionData?.maxPlayers &&
										competitionData?.maxPlayers <=
											players.length) ||
									!competitionData?.registrationOpen
										? "Competition is Full"
										: "Register Now"
								}
								colorVariant="indigo"
							/>
						</section>
					) : null}
				</div>

				{/* main content of the page */}
				<section className="mt-2.5 flex w-full flex-col gap-2.5 lg:w-3/4">
					<section className="rounded-2xl bg-white p-4">
						<h6 className="font-bold">Location</h6>
						{competitionData?.location ? (
							<p className="mb-2.5 mt-5 flex items-center font-bold">
								<a
									className="flex"
									target="_blank"
									href={`http://maps.google.com/?q=1200 ${competitionData.location.address}`}
								>
									<a
										className="flex"
										target="_blank"
										href={`https://maps.apple.com/maps?q=2000 ${competitionData.location.address}`}
									>
										<MdLocationOn
											className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-900"
											aria-hidden="true"
										/>
										Open in Maps
									</a>
								</a>
							</p>
						) : null}

						{competitionData?.location?.latitude &&
						competitionData.location.longitude ? (
								<SimpleMap
									zoom={11}
									lat={competitionData.location.latitude}
									lng={competitionData.location.longitude}
								/>
							) : null}
					</section>

					{/* description section */}
					<section className="rounded-2xl bg-white p-4">
						<h6 className="font-bold">Description</h6>
						<p className="wrap mt-5 flex flex-wrap">
							{competitionData?.description ||
								"ged. It was popularised in the 1960s with the release ged. It was popularised in the 1960s with the release ged. It was popularised in the 1960s with the release ged. It was popularised in the 1960s with the release"}
						</p>
					</section>
					{/* graph section */}
					<section className="rounded-2xl bg-white p-4">
						<h6 className="font-bold">Players</h6>
						<PlayerCardList players={players} />
					</section>
					{/* game section */}
					<section className="rounded-2xl bg-white p-4">
						<h6 className="font-bold">Games</h6>

						<GamesCardList count={gameCount} compID={params.id} />
					</section>
				</section>
			</div>
		</main>
	);
}
