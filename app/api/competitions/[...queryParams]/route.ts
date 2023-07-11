import { CompetitionsResponseType } from "types/next-api";
import { competitionsCollection } from "config/server";
import { Timestamp } from "firebase-admin/firestore";
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
): Promise<NextResponse<CompetitionsResponseType>> {
	// get the parameters from the query
	const [compID, startTime, endTime] = params.queryParams;

	try {
		// if the comp id is provided, return that competition
		if (compID && compID !== "all") {
			const compDoc = await competitionsCollection.doc(compID).get();
			return NextResponse.json([{ ...compDoc.data(), id: compDoc.id }]);
		}

		// set the start timestamp
		const startDate = new Date(startTime || 0);
		const startTimestamp = Timestamp.fromDate(startDate);

		// set the end timestamp to 100 years in the future from today
		const futureDate = new Date();
		futureDate.setFullYear(futureDate.getFullYear() + 100);
		const endTimestamp = Timestamp.fromDate(
			endTime ? new Date(endTime) : futureDate
		);

		// set the use cases for the query
		const querySnapshot = await competitionsCollection
			.where("startTimestamp", ">=", startTimestamp)
			.where("startTimestamp", "<=", endTimestamp)
			.orderBy("startTimestamp")
			.get();
		return NextResponse.json(
			querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
		);
	} catch (error: any) {
		console.log(error);
		throw Error(error);
	}
}
