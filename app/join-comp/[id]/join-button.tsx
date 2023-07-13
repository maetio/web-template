"use client";

import { useRouter } from "next/navigation";
import React from "react";

export /**
 * Will have the home screen render
 *
 * @return {*}
 */
const JoinButton = (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
	// get the router
	const router = useRouter();

	return (
		<button
			type="button"
			className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			{...props}
			onClick={() => router.push("/")}
		>
            Join Competition
		</button>
	);
};
