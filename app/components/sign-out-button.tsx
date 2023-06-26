"use client";

import React, { useState } from "react";
import { Button } from "@mui/material";
import { useAuthContext } from "app/components/providers/auth-context";
import { useRouter } from "next/navigation";
import { signOutUser } from "../../client-actions/auth";
import { useAuth } from "../../auth/hooks";

export /**
 * Button to sign out user
 *
 * @returns
 */
const SignOutButton: React.FC<{}> = () => {
	// state used to detect if email sent
	const [sentEmail, setSentEmail] = useState(false);

	// get the auth context
	// const userContext = useAuthContext();

	const { tenant } = useAuth();

	// get the next router
	const router = useRouter();

	// handle button click button
	const handleClick = () => {
		if (tenant?.idToken) return signOutUser();
		return router.push("/auth");
	};

	return (
		<Button onClick={handleClick}>
			{tenant?.idToken ? "Sign Out" : "Login"}
		</Button>
	);
};
