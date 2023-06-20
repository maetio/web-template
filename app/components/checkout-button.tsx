"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { signOutUser } from "app/api/auth";
import { useAuthContext } from "app/components/providers/auth-context";
import { useRouter } from "next/navigation";

export const CheckoutButton: React.FC<{}> = () => {
	// state used to detect if email sent
	const [sentEmail, setSentEmail] = useState(false);

	// get the auth context
	const userContext = useAuthContext();

	// get the next router
	const router = useRouter();

	// handle button click button
	const handleClick = () => {
		if (!userContext?.uid.length) {
			router.push("/");
		}
		console.log("pressed");
	};

	// useEffect(() => {
	// 	console.log("user lenghts", userContext?.uid.length);
	// 	if (!userContext?.uid.length) {
	// 		router.push("/");
	// 	}
	// }, [router, userContext?.uid.length]);

	return <Button onClick={handleClick}>Checkout</Button>;
};
