import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
	authentication,
	refreshAuthCookies,
} from "next-firebase-auth-edge/lib/next/middleware";
import { getFirebaseAuth } from "next-firebase-auth-edge/lib/auth";
import {
	FirebaseApiKey,
	FirebaseAuthEdgeOptions,
	FirebaseServiceAccount,
} from "config/constants";

// cors whiteListed Domains
const allowedOrigins = ["http://localhost:3000/*", "https://www.google.com"];

// function that will redirect the user to the login page if they are not logged in.
function redirectToLogin(request: NextRequest) {
	// already in login page
	if (request.nextUrl.pathname === "/login") {
		return NextResponse.next();
	}

	// redirect to login page
	const url = request.nextUrl.clone();
	url.pathname = "/login";
	url.search = `redirect=${request.nextUrl.pathname}${url.search}`;

	return NextResponse.redirect(url);
}

/**
 * Next Firebase Auth Edge provides lower level building blocks for custom functionality
 * https://github.com/awinogrodzki/next-firebase-auth-edge#getfirebaseauth
 */
const { setCustomUserClaims, getUser } = getFirebaseAuth(
	FirebaseServiceAccount,
	FirebaseApiKey
);

/**
 * Define the middleware for firebase auth edge
 * https://github.com/awinogrodzki/next-firebase-auth-edge
 *
 * @export
 * @param {NextRequest} request
 * @return {*}
 */
export async function middleware(request: NextRequest) {
	const origin = request.headers.get("origin");
	console.log(origin);

	if ((origin && !allowedOrigins.includes(origin)) || !origin) {
		return new NextResponse(null, {
			status: 400,
			statusText: "Bad Request",
			headers: {
				"Content-Type": "text/plain",
			},
		});
	}

	return authentication(request, {
		// these api routes are automatically created by the middleware
		// see here: https://github.com/awinogrodzki/next-firebase-auth-edge/issues/34
		loginPath: "/api/login",
		logoutPath: "/api/logout",

		// extends the auth edge options defined above
		...FirebaseAuthEdgeOptions,

		// for handling a valid token
		handleValidToken: async ({ token, decodedToken }) => {
			// for handling a request to update the custom claims of a firebase user
			if (request.nextUrl.pathname === "/api/custom-claims") {
				// set the custom claims using the auth edge library
				// see claims on firebase here: https://firebase.google.com/docs/auth/admin/custom-claims
				await setCustomUserClaims(decodedToken.uid, {
					someClaims: ["someValue"],
				});

				// get the authetnicated user
				const user = await getUser(decodedToken.uid);
				const response = new NextResponse(
					JSON.stringify(user.customClaims),
					{
						status: 200,
						headers: { "content-type": "application/json" },
					}
				);

				// refresh the user's auth cookies
				await refreshAuthCookies(
					token,
					response,
					FirebaseAuthEdgeOptions
				);
				return response;
			}

			return NextResponse.next();
		},

		// redirect to the login page when an invalid token is received
		// handleInvalidToken: async () => {
		// 	console.warn("Invalid token - redirecting to login");
		// 	return redirectToLogin(request);
		// },

		// // handle error by redirecting to the login page again
		/* handleError: async (error) => {
			console.error("Unhandled authentication error", { error });
			return redirectToLogin(request);
		},
		*/
	});
}

export const config = {
	matcher: ["/", "/((?!_next/static|favicon.ico|logo.svg).*)"],
};
