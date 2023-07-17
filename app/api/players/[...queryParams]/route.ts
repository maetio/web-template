import { PlayersResponseType } from "types/next-api";
import {
	competitionProfilesSubcollection,
	profileCollection,
} from "config/server";
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
): Promise<NextResponse<PlayersResponseType>> {
	// get the parameters from the query
	const [compID, number] = params.queryParams;

	try {
		// if the comp id is provided, return all the players by default
		if (compID && compID !== "all") {
			const querySnapshot = await competitionProfilesSubcollection(compID)
				.orderBy("rating.displayRating", "desc")
				.limit(Number(number) || 100)
				.get();
			console.log("query snapshot length", querySnapshot.size);	
			return NextResponse.json(
				querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		}

		// get the whole collection group
		const querySnapshot = await profileCollection
			.orderBy("rating.displayRating", "desc")
			.limit(Number(number) || 100)
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
