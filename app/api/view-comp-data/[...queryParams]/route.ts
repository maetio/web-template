import { CompetitionsResponseType } from "types/next-api";
import { competitionsCollection } from "config/server";
import { Timestamp } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

/**
 * Get request for the competitions route
 * Endpoint defined as `competitions/[id]/[startTime]/[endTime]`
 * The startTime and endTime are only used if the id === 'all'
 *
 * @export
 * @param {Request} request
 * @param {{ params: { queryParams: String[] } }} { params }
 * @return {*}
 */
export async function GET(
	_request: Request,
	{ params }: { params: { queryParams: Array<string | undefined> } }
): Promise<NextResponse<CompetitionsResponseType>> {
	// get the parameters from the query
	const [compID, startTime, endTime] = params.queryParams;

	try {
		// start

		// get competition data
		const competitionResponse = await fetch(
			`${BaseURL}/api/competitions/${params.id}`
		);
		const competitions: CompetitionsResponseType =
			await competitionResponse.json();
		const competitionData = competitions.at(0);

		// get the competition players
		const playersResponse = await fetch(
			`${BaseURL}/api/players/${params.id}`
		);
		const players: PlayersResponseType = await playersResponse.json();

		// get the competition games
		const gamesResponse = await fetch(`${BaseURL}/api/games/${params.id}`);
		const games: GamesResponseType = await gamesResponse.json();

		// end

		// if the comp id is provided, return that competition
		if (compID && compID !== "all") {
			const compDoc = await competitionsCollection.doc(compID).get();
			return NextResponse.json([{ ...compDoc.data(), id: compDoc.id }]);
		}

		// set the start timestamp
		const startDate = new Date(startTime || 0);
		const startTimestamp = Timestamp.fromDate(startDate);

		// set the end timestamp to 100 years in the future from today
		const futureDate = new Date();
		futureDate.setFullYear(futureDate.getFullYear() + 100);
		const endTimestamp = Timestamp.fromDate(
			endTime ? new Date(endTime) : futureDate
		);

		// set the use cases for the query
		const querySnapshot = await competitionsCollection
			.where("startTimestamp", ">=", startTimestamp)
			.where("startTimestamp", "<=", endTimestamp)
			.orderBy("startTimestamp")
			.get();
		return NextResponse.json(
			querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
		);
	} catch (error: any) {
		console.log(error);
		throw Error(error);
	}
}

/**
 * Revalidate the api route every 60 seconds
 * https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidation-frequency
 */
export const revalidate = 1;
