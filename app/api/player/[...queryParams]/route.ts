import { PlayerResponseType } from "types/next-api";
import { NextResponse } from "next/server";
import { getProfile } from "server-actions/profiles";

/**
 * API endpont for fetching a given profile for a user
 * Requires the userID and the sport to be passed
 *
 * @export
 * @param {Request} _request
 * @param {({ params: { queryParams: Array<string | undefined> } })} { params }
 * @return {*}  {Promise<NextResponse<PlayerResponseType>>}
 */
export async function GET(
	_request: Request,
	{ params }: { params: { queryParams: Array<string | undefined> } }
): Promise<NextResponse<PlayerResponseType>> {
	// get the parameters from the query
	const [userID, sport] = params.queryParams;

	try {
		// if the comp id is provided, return all the players by default
		if (userID?.length && sport?.length) {
			// fetch the profile doc
			const profileData = await getProfile(userID, sport, "player");

			return NextResponse.json(
				profileData?.id ? profileData : { id: userID }
			);
		}
		throw Error("API route requires both user id and sport");
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