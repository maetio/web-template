import { updateUserNameServer } from "../../server-actions/server/example-mutation";

/**
 * an example of a server component calling a server action mutation
 *
 * @export
 * @return {*}
 */
export function ExampleMutation() {
	return (
		<form action={updateUserNameServer} className="flex gap-2 items-center">
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
