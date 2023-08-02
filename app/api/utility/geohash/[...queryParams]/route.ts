import { NextResponse } from "next/server";
import { geohashForLocation } from "geofire-common";

/**
 * An open api route that takes in the latitude and longitude as query parameters and returns the geohash to the client.
 *
 * @export
 * @param {Request} _request
 * @param {({ params: { queryParams: Array<string | undefined> } })} { params }
 * @return {*}  {Promise<NextResponse<{ geohash: string }>>}
 */
export async function GET(
	_request: Request,
	{ params }: { params: { queryParams: Array<string | undefined> } }
): Promise<NextResponse<{ geohash: string }>> {
	// get the parameters from the query
	const [latitude, longitude] = params.queryParams;

	try {
		if (latitude && longitude) {
			// convert to number
			const lat = Number(latitude);
			const long = Number(longitude);

			// get geohash
			const geohash = geohashForLocation([lat, long]);

			// send geohash to client
			return NextResponse.json({ geohash });
		}
		throw Error("did not input correct latitude and longitude");
	} catch (error: any) {
		console.log(error);
		throw Error(error);
	}
}
