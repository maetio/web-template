export async function GET(request: Request) {
	const origin = request.headers.get("origin");

	console.log("origin", origin);

	const message = {
		message: "hello from get ",
	};

	return new Response(JSON.stringify(message), {
		status: 200,
		headers: {
			"Access-Control-Allow-Origin": origin || "",
			"Content-Type": "application/json",
		},
	});
	// return NextResponse.json(message);
}
