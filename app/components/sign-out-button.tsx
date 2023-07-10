"use client";

import React from "react";
import {signOutUser } from "auth/client";
import { useRouter } from "next/navigation";

export /**
 * Will have the home screen render
 *
 * @return {*}
 */
const SignOutButton = () => {
	// get router
	const router = useRouter();

	// handle click with button
	const handleClick = async () => {
		signOutUser();
		router.push("/");
	};

	return (
		<button
			onClick={() => handleClick()}
			className="p-2 text-xl rounded-2xl text-black border-solid border-black border-2 max-w-xs bg-red-500 hover:cursor-pointer hover:bg-red-400"
		>
		Sign Out
		</button>
	);
};