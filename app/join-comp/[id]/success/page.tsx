import React from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { CompetitionsResponseType } from "types/next-api";
import { BaseURL } from "config/constants";
import { getUserData } from "server-actions/users";
import { getOrCreateProfile } from "server-actions/profiles";
import { NextImage } from "app/components/image";
import { AltPlayerCard } from "app/components/cards/alt-player-card";
import { Steps } from "app/components/layout/steps";
import Link from "next/link";

/**
 * Screen that shows that the player has joined the competition
 *
 * @export
 * @param {{ params: { id: string } }} { params }
 * @return {*}
 */
export default async function JoinCompSuccessScreen({
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
	const competitionData = competitions?.at(0);

	// get the profile data for the user
	const profileData = user?.id
		? await getOrCreateProfile(
				user,
				competitionData?.sport || "basketball",
				"player"
		  )
		: null;

	return (
		<main>
			<Steps
				steps={[
					{
						id: "01",
						name: "Selected Competition",
						href: "#",
						status: "complete",
					},
					{
						id: "02",
						name: "Link Maet Account",
						href: "#",
						status: "complete",
					},
					{
						id: "03",
						name: "Register",
						href: "#",
						status: "complete",
					},
				]}
			/>
			<div className="flex w-full flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
				<div className="sm:w-full sm:max-w-md">
					<NextImage
						className="align-center mx-auto justify-center rounded-xl"
						size={100}
						src={competitionData?.image}
						alt="competition banner"
					/>

					<h2 className="mt-7 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						{competitionData?.name || "Welcome to Maet!"}
					</h2>
				</div>

				<div className="flex-col items-center self-center sm:w-full sm:max-w-md">
					{profileData && <AltPlayerCard player={profileData} />}
					<p className="mt-5 flex items-center justify-center text-xl font-normal leading-tight tracking-tight text-black">
						<IoIosCheckmarkCircle className="mr-2 h-7 w-7 text-green-600" />{" "}
						You have successfully joined the competition!
					</p>

					<Link
						href={`/view-comp/${params.id}`}
						className="text-sm font-normal leading-tight tracking-tight text-indigo-600"
					>
						Return to competition
					</Link>
				</div>
			</div>
		</main>
	);
}
