import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
	authentication,
	refreshAuthCookies,
} from "next-firebase-auth-edge/lib/next/middleware";
import { getFirebaseAuth } from "next-firebase-auth-edge/lib/auth";

// function that will redirect the user to the login page if they are not logged in.
function redirectToLogin(request: NextRequest) {
	if (request.nextUrl.pathname === "/login") {
		return NextResponse.next();
	}

	const url = request.nextUrl.clone();
	url.pathname = "/login";
	url.search = `redirect=${request.nextUrl.pathname}${url.search}`;

	return NextResponse.redirect("/login");
}

const { setCustomUserClaims, getUser } = getFirebaseAuth(
	authConfig.serviceAccount,
	authConfig.apiKey
);

export async function middleware(request: NextRequest) {
	return authentication(request, {
		// these api routes are automatically created by the middleware
		// see here: https://github.com/awinogrodzki/next-firebase-auth-edge/issues/34
		loginPath: "/api/login",
		logoutPath: "/api/logout",

		// extend the auth config
		...authConfig,

		// for handling a valid token
		handleValidToken: async ({ token, decodedToken }) => {
			if (request.nextUrl.pathname === "/api/custom-claims") {
				await setCustomUserClaims(decodedToken.uid, {
					someClaims: ["someValue"],
				});

				const user = await getUser(decodedToken.uid);
				const response = new NextResponse(
					JSON.stringify(user.customClaims),
					{
						status: 200,
						headers: { "content-type": "application/json" },
					}
				);

				await refreshAuthCookies(token, response, authConfig);
				return response;
			}

			return NextResponse.next();
		},

		// redirect to the login page when an invalid token is received
		handleInvalidToken: async () => {
			console.warn("Invalid token - redirecting to login");
			return redirectToLogin(request);
		},

		// handle error by redirecting to the login page again
		handleError: async (error) => {
			console.error("Unhandled authentication error", { error });
			return redirectToLogin(request);
		},
	});
}

export const config = {
	matcher: ["/", "/((?!_next/static|favicon.ico|logo.svg).*)"],
};
