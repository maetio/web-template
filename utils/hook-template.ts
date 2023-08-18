"use client";

import { useState, useCallback } from "react";

export const filterErrorCode = (error: string) => {
	switch (true) {
		case error.includes("email-already-in-use"):
			return "Email is already in use";

		case error.includes("wrong-password"):
			return "Incorrect Password";

		case error.includes("user-not-found"):
			return "This user does not exist, please check password and email";

		default:
			return error;
	}
};

interface HookReturnParameters<T> {
	data: T | undefined;
	isLoading: boolean;
	isSuccess: boolean;
	error: string;
}

type FunctionType<T, R> = (arg: T) => Promise<R | undefined>;

export /**
 * Template hook to update or fetch data
 *
 * @return {*}
 */
const useCreateFirestoreHook = <InputData = never, ReturnDataType = null>(
	firestoreQuery: FunctionType<InputData, ReturnDataType>
): [
	HookReturnParameters<ReturnDataType>,
	FunctionType<InputData, ReturnDataType>
] => {
	// set return states
	const [isLoading, setisLoading] = useState(false);
	const [isSuccess, setisSuccess] = useState(false);
	const [data, setData] = useState<ReturnDataType>();
	const [error, setError] = useState("");

	// function to write to firestore document
	const updateData = useCallback(
		async (inputData: InputData) => {
			// set states
			setisLoading(true);
			setisSuccess(false);
			setError("");

			// set return data
			let returnData;

			// run the firebase query with loading states
			try {
				// run the query for firestore
				returnData = await firestoreQuery(inputData);

				// set the states
				setData(returnData);
				setisLoading(false);
				setisSuccess(true);
				// eslint-disable-next-line @typescript-eslint/no-shadow
			} catch (error: any) {
				// set the error states
				setisLoading(false);
				setisSuccess(false);
				console.log(error.message);
				setError(filterErrorCode(error.message));
			}

			return returnData;
		},
		[firestoreQuery]
	);

	return [{ data, isLoading, isSuccess, error }, updateData];
};
