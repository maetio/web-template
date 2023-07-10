import { PlayerResponseType } from "types/next-api";
import { NextResponse } from "next/server";
import { getOrCreateProfile, getProfile } from "server-actions/profiles";
import { getUserData } from "server-actions/users";
import { Profile } from "types/profile";
 
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
			// fetch the profile doc
			const profileDoc = await getProfile(userID, sport, "player");

			// make a player if they are logged in and are the user
			if (!profileDoc) {
				// get user's private data
				const user = await getUserData();

				// create player
				if (user?.id === userID) {
					// get or create profile
					const newPlayerProfile = await getOrCreateProfile(user, sport as Profile["sport"], "player");
					return NextResponse.json(newPlayerProfile);
				}
			}

			return NextResponse.json({ ...profileDoc?.data(), id: profileDoc?.id || userID });
		}
		throw Error("Need both userID and sport for api endpoint.");
	} catch (error: any) {
		console.log(error);
		throw Error(error);
	}
}