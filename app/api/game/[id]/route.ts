import { NextResponse } from "next/server";
import { GameResponseType } from "types/next-api";
import { gamesCollection } from "config/server";

/**
 * API endpont for fetching a given game
 * Requires the gameID to be passed
 *
 * @export
 * @param {Request} _request
 * @param {({ params: { id: string  } })} { params }
 * @return {*}  {Promise<NextResponse<PlayerResponseType>>}
 */
export async function GET(
	_request: Request,
	{ params }: { params: { id: string } }
): Promise<NextResponse<GameResponseType>> {
	// get the parameters from the query
	const gameID = params.id;

	try {
		// get the game from collection group
		if (gameID?.length) {
			const game = await gamesCollection.doc(gameID).get();
			const gameData = { ...game.data(), id: game.id };
			return NextResponse.json(gameData || { id: gameID });
		}
		throw Error("API route requires a game id");
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
