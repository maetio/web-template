import { PlayerResponseType } from "app/types/next-api";
import { profileCollection } from "config/server";
import { NextResponse } from "next/server";
 
/**
 * API endpont for fetching a given profile for a user
 * Requires the userID and the sport to be passed
 *
 * @export
 * @param {Request} _request
 * @param {({ params: { queryParams: Array<string | undefined> } })} { params }
 * @return {*}  {Promise<NextResponse<PlayerResponseType>>}
 */
export async function GET(_request: Request, { params }: { params: { queryParams: Array<string | undefined> } }): Promise<NextResponse<PlayerResponseType>> {
	// get the parameters from the query
	const [userID, sport] = params.queryParams;

	try {
		// if the comp id is provided, return all the players by default
		if (userID?.length && sport?.length) {
			const querySnapshot = await profileCollection.where("userID", "==", userID).where("sport", "==", sport).where("type", "==", "player").orderBy("rating.numGames", "desc").limit(1).get();
			const playerDoc = querySnapshot.docs.at(0);
			return NextResponse.json({ ...playerDoc?.data(), id: playerDoc?.id || userID });
		}
		throw Error("Need both userID and sport for api endpoint.");
	} catch (error: any) {
		console.log(error);
		throw Error(error);
	}
}