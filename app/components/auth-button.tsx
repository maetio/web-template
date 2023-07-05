"use client";

import React, { useEffect } from "react";
import { mapFirebaseResponseToTenant } from "auth/map-firebase-tenant";
import { signInWithLink } from "config/client-auth";
import { useAuth } from "auth/hooks";
import { useFirebaseAuth } from "auth/firebase";
import { clientConfig } from "config/client";
import { signOut } from "firebase/auth";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export /**
 * Will have the home screen render
 *
 * @return {*}
 */
const AuthButton = () => {
	// get user state
	const { tenant } = useAuth();

	// get the next router
	const router = useRouter();

	// get firebase auth
	const { getFirebaseAuth } = useFirebaseAuth(clientConfig);

	const handleLogin = async () => {
		const auth = await getFirebaseAuth();
		const userCred = await signInWithLink(
			auth,
			localStorage.getItem("email") || "",
			window.location.href
		);

		console.log("user cred after signin function", userCred);
		const idTokenResult = await userCred.user.getIdTokenResult();
		const ten = await mapFirebaseResponseToTenant(
			idTokenResult,
			userCred.user
		);
		console.log("ten from login function", ten);
		console.log("token sent", idTokenResult.token);
		await fetch("/api/login", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${idTokenResult.token}`,
			},
		});
	};

	const handleLogout = async () => {
		localStorage.clear();
		const auth = await getFirebaseAuth();
		await signOut(auth);
		await fetch("http://localhost:3000/api/logout", {
			method: "GET",
		});
		// window.location.reload();
	};

	// will sign in the user
	useEffect(() => {
		if (window.location.href.includes("apiKey")) {
			handleLogin();
		}
	}, []);

	return (
		<Button onClick={tenant?.idToken ? () => handleLogout() : () => router.push("/login")}>
			{tenant?.idToken ? "Sign Out" : "Login"}
		</Button>
	);
};