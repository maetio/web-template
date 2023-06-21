"use client";

import { privateUserCollection } from "app/api/client/config";
import { PrivateUserData } from "app/types";
import { doc, setDoc } from "firebase/firestore";
import { useState, useCallback } from "react";

export /**
 * Hook to update the private user data
 *
 * @return {*} 
 */
const useUpdatePrivateUserData = () => {
	// set return states
	const [isLoading, setisLoading] = useState(false);
	const [isSuccess, setisSuccess] = useState(false);
	const [error, setError] = useState("");

	// function to write to firestore document
	const writeToFirestore = useCallback(async (userData: { id: string } & Partial<PrivateUserData>, newUser?: boolean) => {
		// set states
		setisLoading(true);
		setisSuccess(false);
		setError("");

		// set data in firestore
		try {
			const userRef = doc(privateUserCollection, userData.id);
			await setDoc(userRef, userData, { merge: !newUser });

			setisLoading(false);
			setisSuccess(true);
		// eslint-disable-next-line @typescript-eslint/no-shadow
		} catch (error: any) {
			setisLoading(false);
			setisSuccess(false);
			setError(error.message);
		}
	}, []);

	return { isLoading, isSuccess, error, writeToFirestore };
};