import { ViewCompetitionsResponseType } from "types/next-api";
import {
	competitionProfilesSubcollection,
	competitionsCollection,
	gamesCollection,
} from "config/server";
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
): Promise<NextResponse<ViewCompetitionsResponseType>> {
	// get the parameters from the query
	const [compID] = params.queryParams;

	if (!compID) throw Error("No competition ID provided");
	try {
		const startDate = new Date(0);
		const startTimestamp = Timestamp.fromDate(startDate);

		// set the end timestamp to 100 years in the future from today
		const futureDate = new Date();
		futureDate.setFullYear(futureDate.getFullYear() + 100);
		const endTimestamp = Timestamp.fromDate(futureDate);

		const compDoc = await competitionsCollection.doc(compID).get();

		const gamesSnapshot = await gamesCollection
			.where("competitionID", "==", compID)
			.where("startTimestamp", ">=", startTimestamp)
			.where("startTimestamp", "<", endTimestamp)
			.orderBy("startTimestamp", "asc")
			.get();

		const gamesDoc = gamesSnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}));

		const playerSnapshot = await competitionProfilesSubcollection(compID)
			.orderBy("rating.displayRating", "desc")
			.limit(100)
			.get();

		const players = playerSnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}));

		const returnData: ViewCompetitionsResponseType = {
			competitionDoc: [{ ...compDoc.data(), id: compDoc.id }],
			games: gamesDoc,
			players,
		};

		return NextResponse.json(returnData);
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
