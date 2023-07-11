import { ServiceAccount } from "next-firebase-auth-edge/lib/auth/credential";

/**
 * The base url for the server side code
 * https://github.com/vercel/next.js/discussions/16429
 * Defaults to vercel url, will fallback to env variable for local host
 */
export const BaseURL =
	process.env.NEXT_PUBLIC_VERCEL_URL ??
	process.env.NEXT_PUBLIC_SITE_URL ??
	"http://localhost:3000/";

/**
 * Define the firebase service account credentials for firebase admin
 */
export const FirebaseServiceAccount: ServiceAccount = {
	projectId: process.env.FIREBASE_PROJECT_ID || "",
	clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL || "",
	privateKey:
		process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n") || "",
};

/**
 * Define the firebase api key
 */
export const FirebaseApiKey: string = process.env.FIREBASE_API_KEY || "";

export /**
 * Options for the auth edge authentication
 * Set here for reusability in the firebase auth custom functions
 */
const FirebaseAuthEdgeOptions = {
	// set the cookie parameters
	// see here: https://github.com/awinogrodzki/next-firebase-auth-edge#options
	cookieName: "AuthToken",
	cookieSignatureKeys: ["secret1", "secret2"],
	cookieSerializeOptions: {
		path: "/",
		httpOnly: true,
		// secure: false, // Set this to true on HTTPS environments
		sameSite: "lax" as const, // Decide if lax or strict is better
		// sameSite: "strict" as const,
		maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
	},

	// define the firebase service account and api key
	serviceAccount: FirebaseServiceAccount,
	apiKey: FirebaseApiKey,
};
