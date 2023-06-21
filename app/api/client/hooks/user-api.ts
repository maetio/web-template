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
	const firestoreQuery = async (userData: { id: string } & Partial<PrivateUserData>, newUser?: boolean) => {
		const userRef = doc(privateUserCollection, userData.id);
		return setDoc(userRef, userData, { merge: !newUser });
	};
	return useCreateFirestoreHook(firestoreQuery);
};
