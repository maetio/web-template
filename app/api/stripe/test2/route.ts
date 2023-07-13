import { NextResponse } from "next/server";

export async function GET(_req: Request) {
	const message = {
		message: "hello from get ",
	};

	return NextResponse.json(message);
}
