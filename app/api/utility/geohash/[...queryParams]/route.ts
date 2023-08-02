import { NextResponse } from "next/server";
import { geohashForLocation } from "geofire-common";

export async function GET(
	_request: Request,
	{ params }: { params: { queryParams: Array<string | undefined> } }
): Promise<NextResponse<{ geohash: string }>> {
	// get the parameters from the query
	const [latitude, longitude] = params.queryParams;

	try {
		if (latitude && longitude) {
			const lat = Number(latitude);
			const long = Number(longitude);

			const geohash = geohashForLocation([lat, long]);

			return NextResponse.json({ geohash });
		}
		throw Error("did not input correct latitude and longitude");
	} catch (error: any) {
		console.log(error);
		throw Error(error);
	}
}
