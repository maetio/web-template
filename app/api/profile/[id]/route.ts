import { PlayerResponseType } from "types/next-api";
import { NextResponse } from "next/server";
import { profileCollection } from "config/server";

/**
 * API endpont for fetching a profile by id
 *
 * @export
 * @param {Request} _request
 * @param {({ params: { queryParams: Array<string | undefined> } })} { params }
 * @return {*}  {Promise<NextResponse<PlayerResponseType>>}
 */
export async function GET(
	_request: Request,
	{ params }: { params: { id: string | undefined } }
): Promise<NextResponse<PlayerResponseType>> {
	// get the parameters from the query

	try {
		// if the comp id is provided, return all the players by default
		if (params.id) {
			const profileDoc = await profileCollection.doc(params.id).get();

			return NextResponse.json({
				...profileDoc.data(),
				id: profileDoc.id,
			});
		}
		throw Error("API route requires a profile id");
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
