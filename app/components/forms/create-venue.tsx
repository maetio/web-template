"use client";

import React from "react";
import { HiPhoto } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { venueSchema } from "utils/schemas";
import { FormInput } from "./form-input";
import { FormTextArea } from "./form-text-area";
import { ActionButton } from "../action-button";

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

							<FormInput
								className="col-span-full"
								register={register}
								name="image"
								type="image"
								label="Cover Photo"
							/>
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
							<FormInput
								className="sm:col-span-4"
								register={register}
								name="email"
								type="email"
								label="Contact Email"
								placeholder="example@domain.com"
							/>

							<FormInput
								className="sm:col-span-4"
								register={register}
								name="phoneNumber"
								type="text"
								label="Phone Number"
								placeholder="+1 (555) 987-6543"
							/>

							<FormInput
								className="sm:col-span-4"
								register={register}
								name="website"
								type="text"
								label="Enter website (optional)"
								placeholder="www.example.com"
							/>
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
							<FormInput
								className="sm:col-span-4"
								register={register}
								name="courtNumber"
								type="number"
								label="Number of courts"
								defaultValue="0"
							/>

							<FormInput
								className="sm:col-span-4"
								register={register}
								name="hoursPerWeek"
								type="number"
								label="On average, how many hours per week will your venue be available for bookings?"
								defaultValue="0"
							/>
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
							<FormInput
								className="sm:col-span-4"
								register={register}
								name="pricePerHour"
								type="number"
								label="How much do you charge per hour?"
								defaultValue="0"
							/>
						</div>
					</div>
				</form>
			</div>
			<div className="flex w-full justify-center">
				<ActionButton />
			</div>
		</div>
	);
};
