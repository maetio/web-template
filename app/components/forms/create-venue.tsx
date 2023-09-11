"use client";

import React from "react";
import { HiPhoto } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { venueSchema } from "utils/schemas";
import { FormInput } from "./form-input";
import { FormTextArea } from "./form-text-area";

export const CreateVenue = () => {
	// react hook form
	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(venueSchema),
	});

	return (
		<div className="mt-12 space-y-10 px-10">
			<h1 className="w-[842px] text-[32px] font-bold tracking-wide text-black">
				Create Your Veneu
			</h1>
			<div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
				<div className="px-4 sm:px-0">
					<h2 className="text-base font-semibold leading-7 text-gray-900">
						Information
					</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						This information will be displayed publicly so be
						careful what you share.
					</p>
				</div>

				<form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
					<div className="px-4 py-6 sm:p-8">
						<div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							<FormInput
								className="sm:col-span-4"
								register={register}
								name="name"
								type="text"
								label="Venue Name"
							/>

							<FormTextArea
								className="col-span-full"
								register={register}
								name="about"
								rows={3}
								label="About"
								placeholder="Enter description here"
							/>

							<div className="col-span-full">
								<label
									htmlFor="cover-photo"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Cover photo
								</label>
								<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
									<div className="text-center">
										<HiPhoto
											className="mx-auto h-12 w-12 text-gray-300"
											aria-hidden="true"
										/>
										<div className="mt-4 flex text-sm leading-6 text-gray-600">
											<label
												htmlFor="file-upload"
												className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
											>
												<span>Upload a file</span>
												<input
													id="file-upload"
													name="file-upload"
													type="file"
													className="sr-only"
												/>
											</label>
											<p className="pl-1">
												or drag and drop
											</p>
										</div>
										<p className="text-xs leading-5 text-gray-600">
											PNG, JPG, GIF up to 10MB
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>

			<div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
				<div className="px-4 sm:px-0">
					<h2 className="text-base font-semibold leading-7 text-gray-900">
						Contact
					</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						How can people reach your venue?
					</p>
				</div>

				<form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
					<div className="px-4 py-6 sm:p-8">
						<div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							<div className="sm:col-span-4">
								<label
									htmlFor="email"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Contact Email
								</label>
								<div className="mt-2">
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										placeholder="example@domain.com"
									/>
								</div>
							</div>

							<div className="sm:col-span-4">
								<label
									htmlFor="phone-number"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Phone Number
								</label>
								<div className="relative mt-2 rounded-md shadow-sm">
									<div className="absolute inset-y-0 left-0 flex items-center">
										<label
											htmlFor="country"
											className="sr-only"
										>
											Country
										</label>
										<select
											id="country"
											name="country"
											autoComplete="country"
											className="h-full rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
										>
											<option>US</option>
											<option>CA</option>
											<option>EU</option>
										</select>
									</div>
									<input
										type="text"
										name="phone-number"
										id="phone-number"
										className="block w-full rounded-md border-0 py-1.5 pl-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										placeholder="+1 (555) 987-6543"
									/>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>

			<div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
				<div className="px-4 sm:px-0">
					<h2 className="text-base font-semibold leading-7 text-gray-900">
						Courts and Availibility
					</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						How often can players book your venue?
					</p>
				</div>

				<form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
					<div className="px-4 py-6 sm:p-8">
						<div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							<div className="sm:col-span-3">
								<label
									htmlFor="first-name"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
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
								<label
									htmlFor="last-name"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
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

							<div className="sm:col-span-4">
								<label
									htmlFor="email"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Email address
								</label>
								<div className="mt-2">
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div className="sm:col-span-4">
								<label
									htmlFor="country"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Country
								</label>
								<div className="mt-2">
									<select
										id="country"
										name="country"
										autoComplete="country-name"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
									>
										<option>United States</option>
										<option>Canada</option>
										<option>Mexico</option>
									</select>
								</div>
							</div>

							<div className="col-span-full">
								<label
									htmlFor="street-address"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Street address
								</label>
								<div className="mt-2">
									<input
										type="text"
										name="street-address"
										id="street-address"
										autoComplete="street-address"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div className="sm:col-span-2 sm:col-start-1">
								<label
									htmlFor="city"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									City
								</label>
								<div className="mt-2">
									<input
										type="text"
										name="city"
										id="city"
										autoComplete="address-level2"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="region"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									State / Province
								</label>
								<div className="mt-2">
									<input
										type="text"
										name="region"
										id="region"
										autoComplete="address-level1"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="postal-code"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									ZIP / Postal code
								</label>
								<div className="mt-2">
									<input
										type="text"
										name="postal-code"
										id="postal-code"
										autoComplete="postal-code"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>

			<div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
				<div className="px-4 sm:px-0">
					<h2 className="text-base font-semibold leading-7 text-gray-900">
						Pricing
					</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						How much would you like to charge for your venue?
					</p>
				</div>

				<form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
					<div className="px-4 py-6 sm:p-8">
						<div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							{/* <div className="sm:col-span-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div> */}

							{/* <FormInput register={} /> */}
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
