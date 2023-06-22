"use client";

import React, { useState } from "react";
import { Button } from "@mui/material";
import { signOutUser } from "app/api/client/auth";
import { useAuthContext } from "app/components/providers/auth-context";
import { useRouter } from "next/navigation";

export /**
 * Button to sign out user
 * 
 * @returns 
 */
const SignOutButton: React.FC<{}> = () => {
	// state used to detect if email sent
	const [sentEmail, setSentEmail] = useState(false);

	// get the auth context
	const userContext = useAuthContext();

	// get the next router
	const router = useRouter();

	// handle button click button
	const handleClick = () => {
		if (userContext?.uid.length) return signOutUser();
		return router.push("/auth");
	};

	return (
		<Button onClick={handleClick}>
			{userContext?.uid.length ? "Sign Out" : "Login"}
		</Button>
	);
};
