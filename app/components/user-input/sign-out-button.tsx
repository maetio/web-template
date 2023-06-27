"use client";

import React, { useState } from "react";
import { Button } from "@mui/material";
// import { useAuthContext } from "app/components/providers/auth-context";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { useAuth } from "auth/hooks";
import { useFirebaseAuth } from "auth/firebase";
import { clientConfig } from "config/client-config";
// import { signOutUser } from "../../actions/client-actions/auth";

export /**
 * Button to sign out user
 *
 * @returns
 */
const SignOutButton: React.FC<{}> = () => {
	const { tenant } = useAuth();
	const { getFirebaseAuth } = useFirebaseAuth(clientConfig);

	// get the next router
	const router = useRouter();

	// handle button click button
	const handleClick = async () => {
		localStorage.clear();
		const auth = await getFirebaseAuth();
		await signOut(auth);
		await fetch("http://localhost:3000//api/logout", {
			method: "GET",
		});
		// window.location.reload();
		return router.push("/auth");
	};

	return (
		<Button onClick={handleClick}>
			{tenant?.idToken ? "Sign Out" : "Login"}
		</Button>
	);
};
