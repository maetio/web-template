"use client";

import { addTodo } from "actions/server/example-mutation";

export function ExampleMutation() {
	const handleUpdatePrivateUserData = async ({
		firstName,
		lastName,
	}: {
		firstName: string;
		lastName: string;
	}) => {
		console.log("sumbit fired", firstName, lastName);
		// if (tenant?.id) {
		const userData = {
			firstName,
			lastName,
			id: "1",
		};

		await fetch("/api/update-name", {
			method: "POST",
			body: JSON.stringify(userData),
		});
		// }
	};
	const content = (
		<form
			// onSubmit={() =>
			// 	handleUpdatePrivateUserData({
			// 		firstName: "dawd",
			// 		lastName: "adwadw",
			// 	})
			// }
			action={addTodo}
			className="flex gap-2 items-center"
		>
			<input
				type="text"
				name="firstName"
				className="text-2xl p-1 rounded-lg flex-grow w-full"
				placeholder="firstName"
				autoFocus
			/>
			<input
				type="text"
				name="lastName"
				className="text-2xl p-1 rounded-lg flex-grow w-full"
				placeholder="lastName"
				autoFocus
			/>

			<button
				type="submit"
				className="p-2 text-xl rounded-2xl text-black border-solid border-black border-2 max-w-xs bg-green-500 hover:cursor-pointer hover:bg-green-400"
			>
				Submit
			</button>
		</form>
	);

	return content;
}
