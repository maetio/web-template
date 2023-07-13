"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";

interface CustomButtonParams {
	action?: () => Promise<void>;
	referRoute?: string;
};

export /**
 * Will have the home screen render
 *
 * @return {*}
 */
const SubmitFormActionButton = ({ action, referRoute, ...buttonParams}: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & CustomButtonParams) => {
	// get router
	const router = useRouter();

	// get transition state
	const [isPending, startTransition] = useTransition();

	// handle click with button
	const handleClick = async () => {
		// invoke another call for the user data to update
		if (action) {
			startTransition(async () => {
				await action();
			});
		}
		// route to home
		if (referRoute) router.push(referRoute);
	};

	return (
		<button
			disabled={isPending}
			onClick={() => handleClick()}
			className="p-2 text-xl rounded-2xl text-black border-solid border-black border-2 max-w-xs bg-red-500 hover:cursor-pointer hover:bg-red-400"
			{...buttonParams}
		>
			{isPending ? "Loading..." : "Sign Out"}
		</button>
	);
};
