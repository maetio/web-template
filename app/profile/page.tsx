import { SignOutButton } from "app/components/sign-out-button";
import { getUserData, updateUserData } from "server-actions/users";

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
export default async function Profile() {
	// fetch the user data
	const userData = await getUserData();
	return (
		<div>
			<form action={submitFormAction} className="flex items-center gap-2">
				<h1>Edit Profile Data</h1>
				<p>{userData?.email}</p>
				<p>
					{userData?.firstName} {userData?.lastName}
				</p>
				<input
					required
					type="text"
					name="firstName"
					className="w-full flex-grow rounded-lg p-1 text-2xl"
					placeholder="firstName"
					autoFocus
				/>
				<input
					type="text"
					name="lastName"
					className="w-full flex-grow rounded-lg p-1 text-2xl"
					placeholder="lastName"
					autoFocus
				/>
				<button
					type="submit"
					className="max-w-xs rounded-2xl border-2 border-solid border-black bg-green-500 p-2 text-xl text-black hover:cursor-pointer hover:bg-green-400"
				>
					Submit
				</button>
			</form>
			<SignOutButton />
		</div>
	);
}
