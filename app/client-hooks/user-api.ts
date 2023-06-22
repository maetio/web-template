"use client";

import { privateUserCollection } from "app/api/config";
import { PrivateUserData } from "app/types";
import { useState, useCallback } from "react";

export const useUpdatePrivateUserData = () => {
	const [isLoading, setisLoading] = useState(false);
	const [isSuccess, setisSuccess] = useState(false);
	const [error, setError] = useState("");

	const writeToFirestore = useCallback(
		async (
			userData: { id: string } & Partial<PrivateUserData>,
			newUser?: boolean
		) => {
			setisLoading(true);
			setisSuccess(false);
			setError("");

			try {
				const userRef = privateUserCollection.doc(userData.id);
				await userRef.set(userData, { merge: !newUser });

				setisLoading(false);
				setisSuccess(true);
				// eslint-disable-next-line @typescript-eslint/no-shadow
			} catch (error: any) {
				setisLoading(false);
				setisSuccess(false);
				setError(error.message);
			}
		},
		[]
	);

	return { isLoading, isSuccess, error, writeToFirestore };
};
