import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const origin = req.headers.get("origin");
	const message = {
		message: "hello from get ",
		origin,
	};

	return NextResponse.json(message);
}
