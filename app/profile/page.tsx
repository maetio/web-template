import { SignOutButton } from "app/components/sign-out-button";
import Image from "next/image";
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
		<form>
			<div className="space-y-12">
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
					</p>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="col-span-full">
							<label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Photo
							</label>
							<div className="mt-2 flex items-center gap-x-3">
								<Image
									className="rounded-full ml-2"
									src={"/constants/vercel.png"}
									width={40}
									height={40}
									alt=""
									loader={() => userData.image || "https://global.discourse-cdn.com/turtlehead/optimized/2X/c/c830d1dee245de3c851f0f88b6c57c83c69f3ace_2_250x250.png"}
								/>
								<button
									disabled
									type="button"
									className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
								>
                  Change
								</button>
							</div>
						</div>

						<div className="col-span-full">
							<label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Cover photo
							</label>
							<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
								<div className="text-center">
									<PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
									<div className="mt-4 flex text-sm leading-6 text-gray-600">
										<label
											htmlFor="file-upload"
											className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
										>
											<span>Upload a file</span>
											<input id="file-upload" name="file-upload" type="file" className="sr-only" />
										</label>
										<p className="pl-1">or drag and drop</p>
									</div>
									<p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="first-name"
									id="first-name"
									autoComplete="given-name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="last-name"
									id="last-name"
									autoComplete="family-name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 flex items-center justify-end gap-x-6">
				<button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
				</button>
				<button
					type="submit"
					className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
          Save
				</button>
			</div>
		</form>
		// <div>
		// 	<form action={submitFormAction} className="flex items-center gap-2">
		// 		<h1>Edit Profile Data</h1>
		// 		<p>{userData?.email}</p>
		// 		<p>
		// 			{userData?.firstName} {userData?.lastName}
		// 		</p>
		// 		<input
		// 			required
		// 			type="text"
		// 			name="firstName"
		// 			className="w-full flex-grow rounded-lg p-1 text-2xl"
		// 			placeholder="firstName"
		// 			autoFocus
		// 		/>
		// 		<input
		// 			type="text"
		// 			name="lastName"
		// 			className="w-full flex-grow rounded-lg p-1 text-2xl"
		// 			placeholder="lastName"
		// 			autoFocus
		// 		/>
		// 		<button
		// 			type="submit"
		// 			className="max-w-xs rounded-2xl border-2 border-solid border-black bg-green-500 p-2 text-xl text-black hover:cursor-pointer hover:bg-green-400"
		// 		>
		// 			Submit
		// 		</button>
		// 	</form>
		// 	<SignOutButton />
		// </div>
	);
}
