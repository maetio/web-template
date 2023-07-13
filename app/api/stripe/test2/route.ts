import { NextResponse } from "next/server";

export async function GET() {
	const message = {
		message: "hello from get ",
	};

	return NextResponse.json(message);
}
