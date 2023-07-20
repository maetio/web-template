"use client";

import React from "react";
import Link from "next/link";
import { useAuthContext } from "auth/auth-context-provider";
import Image from "next/image";

export /**
 * Will have the home screen render
 *
 * @return {*}
 */
const ProfileButton = () => {
	// get the user context
	const userData = useAuthContext();

	return (
		<div className="col-span-3 mr-2 flex items-center justify-end">
			{userData?.id ? (
				<Link
					href="/profile"
					className="col-span-3 mr-2 flex items-center justify-end"
				>
					<p className="text-center text-sm lg:text-base">
						{userData?.firstName} {userData?.lastName}
					</p>
					<Image
						className="ml-2 rounded-full"
						src={"/constants/vercel.png"}
						width={40}
						height={40}
						alt=""
						loader={() =>
							userData.image ||
							"https://global.discourse-cdn.com/turtlehead/optimized/2X/c/c830d1dee245de3c851f0f88b6c57c83c69f3ace_2_250x250.png"
						}
					/>
				</Link>
			) : (
				<Link
					href="/login"
					className="col-span-3 mr-2 flex items-center justify-end"
				>
					Login
					<Image
						className="ml-2 rounded-full"
						src={"/constants/vercel.png"}
						width={40}
						height={40}
						alt=""
						loader={() =>
							"https://global.discourse-cdn.com/turtlehead/optimized/2X/c/c830d1dee245de3c851f0f88b6c57c83c69f3ace_2_250x250.png"
						}
					/>
				</Link>
			)}
		</div>
	);
};
