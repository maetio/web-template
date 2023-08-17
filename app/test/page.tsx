"use client";

import React, { useState } from "react";

export default function Test() {
	const [expanded, setExpanded] = useState(false);

	const handleExpand = () => {
		setExpanded(true);
	};

	return (
		<main>
			<div className="flex h-screen items-center justify-center">
				<form className="rounded bg-white p-6 shadow-md">
					<div className="mb-4">
						<label
							htmlFor="username"
							className="mb-2 block font-semibold text-gray-700"
						>
							Username
						</label>
						<input
							type="text"
							id="username"
							name="username"
							className="w-full rounded border p-2 focus:border-blue-500 focus:outline-none"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="password"
							className="mb-2 block font-semibold text-gray-700"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							className="w-full rounded border p-2 focus:border-blue-500 focus:outline-none"
						/>
					</div>

					<div
						className={`mt-4 opacity-0 transition-opacity duration-300 ${
							expanded ? "inline opacity-100" : "hidden opacity-0"
						}`}
					>
						<div className="mb-4">
							<label
								htmlFor="newUsername"
								className="mb-2 block font-semibold text-gray-700"
							>
								New Username
							</label>
							<input
								type="text"
								id="newUsername"
								name="newUsername"
								className="w-full rounded border p-2 focus:border-blue-500 focus:outline-none"
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="newPassword"
								className="mb-2 block font-semibold text-gray-700"
							>
								New Password
							</label>
							<input
								type="password"
								id="newPassword"
								name="newPassword"
								className="w-full rounded border p-2 focus:border-blue-500 focus:outline-none"
							/>
						</div>
					</div>

					<button
						type="button"
						className="focus:shadow-outline-blue rounded bg-blue-500 px-4 py-2 font-semibold text-white focus:outline-none"
						onClick={handleExpand}
					>
						Expand Form
					</button>
					{/* <div
						className={`mt-4 transition-opacity duration-300 ${
							expanded ? "opacity-100" : "opacity-0"
						}`}
					>
						<div className="mb-4">
							<label
								htmlFor="newUsername"
								className="mb-2 block font-semibold text-gray-700"
							>
								New Username
							</label>
							<input
								type="text"
								id="newUsername"
								name="newUsername"
								className="w-full rounded border p-2 focus:border-blue-500 focus:outline-none"
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="newPassword"
								className="mb-2 block font-semibold text-gray-700"
							>
								New Password
							</label>
							<input
								type="password"
								id="newPassword"
								name="newPassword"
								className="w-full rounded border p-2 focus:border-blue-500 focus:outline-none"
							/>
						</div>
					</div> */}
				</form>
			</div>
		</main>
	);
}
