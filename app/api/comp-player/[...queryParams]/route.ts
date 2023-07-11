import { CompProfilesResponseType } from "types/next-api";
import { NextResponse } from "next/server";
import { competitionProfilesSubcollection } from "config/server";
 
/**
 * API endpont for fetching a given competition player
 * Requires the comp id and the user id be passed
 *
 * @export
 * @param {Request} _request
 * @param {({ params: { queryParams: Array<string | undefined> } })} { params }
 * @return {*}  {Promise<NextResponse<PlayerResponseType>>}
 */
export async function GET(_request: Request, { params }: { params: { queryParams: Array<string | undefined> } }): Promise<NextResponse<CompProfilesResponseType>> {
	// get the parameters from the query
	const [compID, userID] = params.queryParams;

	try {
		// if the comp id is provided, return all the players by default
		if (compID?.length && userID?.length) {
			// fetch the profile doc
			const profileResponse = await competitionProfilesSubcollection(compID).where("userID", "==", userID).orderBy("rating.numGames", "desc").get();

			return NextResponse.json({ ...profileResponse.docs.at(0)?.data(), id: profileResponse.docs.at(0)?.id || userID });
		}
		throw Error("Need both userID and sport for api endpoint.");
	} catch (error: any) {
		throw Error(error);
	}
}