import { GamesResponseType } from "types/next-api";
import {  gamesCollection } from "config/server";
import { Timestamp } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

/**
 * Get request for the games route
 * Endpoint defined as `games/[id]/[startTime]/[endTime]`
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
): Promise<NextResponse<GamesResponseType>> {
	// get the parameters from the query
	const [compID, startTime, endTime] = params.queryParams;

	try {
		// set the start timestamp
		const startDate = new Date(startTime || 0);
		const startTimestamp = Timestamp.fromDate(startDate);

		// set the end timestamp to 100 years in the future from today
		const futureDate = new Date();
		futureDate.setFullYear(futureDate.getFullYear() + 100);
		const endTimestamp = Timestamp.fromDate(
			endTime ? new Date(endTime) : futureDate
		);

		// if the comp id is provided, return that competition
		if (compID && compID !== "all") {
			const querySnapshot = await gamesCollection.where("competitionID", "==", compID).where("startTimestamp", ">=", startTimestamp).where("startTimestamp", "<", endTimestamp).orderBy("startTimestamp", "asc").get();
			return NextResponse.json(
				querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		}

		// get all the games within a certain frame
		const querySnapshot = await gamesCollection
			.where("startTimestamp", ">=", startTimestamp)
			.where("startTimestamp", "<=", endTimestamp)
			.orderBy("startTimestamp", "asc")
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
export const revalidate = 60;
