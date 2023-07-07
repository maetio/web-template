import { updateUserData } from "server-actions/users";

/**
 * Define the submitting form action
 *
 * @param {FormData} data
 */
const submitFormAction = async (data: FormData) => {
	"use server";

	// get the data
	const firstName = data?.get("firstName")?.toString();
	const lastName = data?.get("lastName")?.toString();

	// update the data with the server action
	await updateUserData({ firstName, lastName });
};

/**
 * Server component that displays the profile screen
 *
 * @export
 * @return {*}
 */
export default function Profile() {
	return (
		<form action={submitFormAction} className="flex gap-2 items-center">
			<h1>Edit Profile Data</h1>
			<input
				required
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
}
