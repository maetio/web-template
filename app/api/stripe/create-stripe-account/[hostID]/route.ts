import { NextResponse } from "next/server";

export async function POST(
	req: Request,
	{ params }: { params: { queryParams: Array<string | undefined> } }
) {
	// get the parameters from the query
	const [hostID] = params.queryParams;

	try {
		console.log("host id", hostID);
		return NextResponse.json(hostID);
	} catch (error: any) {
		console.log(error);
		throw Error(error);
	}
}
