import { NextResponse } from "next/server";
import { GameProfilesResponseType } from "types/next-api";
import { gameProfileCollectionGroup } from "config/server";

/**
 * API call will fetch the game-profiles, sorting by timestamp
 *
 * @export
 * @param {Request} _request
 * @param {({ params: { queryParams: Array<string | undefined> } })} { params }
 * @return {*}  {Promise<NextResponse<GameProfilesResponseType>>}
 */
export async function GET(
	_request: Request,
	{ params }: { params: { queryParams: Array<string | undefined> } }
): Promise<NextResponse<GameProfilesResponseType>> {
	// get the parameters from the query
	const [profileID, number] = params.queryParams;

	try {
		// get the whole collection group
		const querySnapshot = await gameProfileCollectionGroup
			.where("profileID", "==", profileID)
			.orderBy("startTimestamp", "desc")
			.limit(Number(number) || 20)
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
