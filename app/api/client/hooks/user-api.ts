"use client";

import { privateUserCollection } from "app/api/client/config";
import { useCreateFirestoreHook } from "app/api/client/hooks/template";
import { PrivateUserData } from "app/types";
import { doc, setDoc } from "firebase/firestore";

export /**
 * Hook to update the private user data
 *
 * @return {*}
 */
const useUpdatePrivateUserData = () => {
	// define firestore query
	const firestoreQuery = async (
		userData: { id: string } & Partial<PrivateUserData>
	) => {
		const userRef = doc(privateUserCollection, userData.id);
		return setDoc(userRef, userData, { merge: true });
	};
	// convert to hook and return it
	return useCreateFirestoreHook(firestoreQuery);
};
