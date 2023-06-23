"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLoadingCallback } from "react-loading-hook";
import { Button, CircularProgress } from "@mui/material";
import { useFirebaseAuth } from "../../auth/firebase";
import { clientConfig } from "../../config/client-config";
import { getGoogleProvider, loginWithProvider } from "./firebase";
import { useAuth } from "../../auth/hooks";
import styles from "./login.module.css";

export function LoginPage() {
	const router = useRouter();
	const params = useSearchParams();
	const [hasLogged, setHasLogged] = React.useState(false);
	const { tenant } = useAuth();
	const { getFirebaseAuth } = useFirebaseAuth(clientConfig);
	const [handleLoginWithGoogle, isLoading] = useLoadingCallback(async () => {
		setHasLogged(false);
		const { GoogleAuthProvider } = await import("firebase/auth");
		const auth = await getFirebaseAuth();
		// const tenant = await loginWithProvider(
		// 	auth,
		// 	await getGoogleProvider(auth),
		// 	GoogleAuthProvider.credentialFromError
		// );
		await fetch("/api/login", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${tenant?.idToken}`,
			},
		});
		setHasLogged(true);
		const redirect = params?.get("redirect");
		router.push(redirect ?? "/");
	});

	return (
		<div className={styles.page}>
			<h2>next-firebase-auth-edge example login page</h2>
			{!tenant && !isLoading && !hasLogged && (
				<div className={styles.info}>
					<p>
						No user found. Singing in as anonymous...{" "}
						<CircularProgress />
					</p>
				</div>
			)}
			{!hasLogged && (
				<Button
					disabled={isLoading || !tenant}
					onClick={handleLoginWithGoogle}
				>
					{isLoading ? <CircularProgress /> : "Log in with Google"}
				</Button>
			)}
			{hasLogged && (
				<div className={styles.info}>
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
