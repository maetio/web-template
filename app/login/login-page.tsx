"use client";

import { useState } from "react";
import {
	//  useRouter,
	useSearchParams,
} from "next/navigation";
// import { useLoadingCallback } from "react-loading-hook";
import { Button, CircularProgress } from "@mui/material";
// import { useFirebaseAuth } from "../../auth/firebase";
// import { clientConfig } from "../../config/client-config";
// import { getGoogleProvider, loginWithProvider } from "./firebase";
// import { useAuth } from "../../auth/hooks";
import { EnterEmail } from "./enter-email";

export function LoginPage() {
	// all the commented out code is for google auth

	// const router = useRouter();
	const params = useSearchParams();
	const [hasLogged, setHasLogged] = useState(false);
	// const { tenant } = useAuth();
	// const { getFirebaseAuth } = useFirebaseAuth(clientConfig);

	// const [handleLoginWithGoogle, isLoading] = useLoadingCallback(async () => {
	// 	setHasLogged(false);
	// 	const { GoogleAuthProvider } = await import("firebase/auth");
	// 	const auth = await getFirebaseAuth();

	// 	await fetch("/api/login", {
	// 		method: "GET",
	// 		headers: {
	// 			Authorization: `Bearer ${tenant?.idToken}`,
	// 		},
	// 	});
	// 	setHasLogged(true);
	// 	const redirect = params?.get("redirect");
	// 	router.push(redirect ?? "/");
	// });

	return (
		<div>
			<h2>next-firebase-auth-edge example login page</h2>
			{/* {!tenant && !isLoading && !hasLogged && (
				<div>
					<p>
						No user found. Singing in as anonymous...{" "}
						<CircularProgress />
					</p>
				</div>
			)} */}
			<EnterEmail />
			{/* {!hasLogged && (
				<Button
					disabled={isLoading || !tenant}
					onClick={handleLoginWithGoogle}
				>
					{isLoading ? <CircularProgress /> : "Log in with Google"}
				</Button>
			)} */}
			{hasLogged && (
				<div>
					<p>
						Redirecting to{" "}
						<strong>{params?.get("redirect") || "/"}</strong>{" "}
						<CircularProgress />
					</p>
				</div>
			)}
		</div>
	);
}
