"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { VenueSchemaType, venueSchema } from "utils/schemas";
import { Venue } from "types/venue";
import { updateVenue } from "server-actions/venue";
import { BaseURL } from "config/constants";
import { useQueryHook } from "utils/hook-template";
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
		resolver: yupResolver<VenueSchemaType>(venueSchema),
	});

	const handleVenueCreation = async (data: VenueSchemaType) => {
		// get the image from file input

		const sortedVenue: Partial<Venue> = {
			name: data.name,
			email: data.email,
			website: data.website,
			about: data.about,
			phoneNumber: data.phoneNumber,
			pricePerHour: data.pricePerHour,
			images: [
				"https://images.pexels.com/photos/6985001/pexels-photo-6985001.jpeg?auto=compress&cs=tinysrgb&w=1200",
			],
		};

		const id = await updateVenue(sortedVenue);

		if (data.images) {
			// the typing on these files is pretty tricky, maybe you can figure it out
			const image: File = (data.images as FileList)[0];

			console.log("content type", image.type);

			const formData = new FormData();
			formData.append("file", image);

			const resp = await fetch(
				`${BaseURL}/api/venue/upload-image/${id}`,
				{
					method: "POST",
					body: formData,
				}
			);

			const url = await resp.json();

			await updateVenue({ images: url }, id);
		}
	};

	const [{ isLoading }, updateData] = useQueryHook(handleVenueCreation);

	return (
		<div className="mt-12 space-y-10">
			<form onSubmit={handleSubmit(updateData)}>
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

					{/* <img src="https://storage.googleapis.com/maet-dev-ced69.appspot.com/venue/wzHjhEcawjqss0H5Pk9U?GoogleAccessId=firebase-adminsdk-le5l6%40maet-dev-ced69.iam.gserviceaccount.com&Expires=4102358400&Signature=i5yYdjNr5hVGGJsQacZH2GlnvqGmA7uRLREXOOtHK2t0qPPMqQeUHkh0rEsp82L3xRDMcDb%2BXS6I%2BsnJEcq3LLSUWs7m3oma%2BE1fjMGmW2E8wltmN4kLuuy0160GmAURFC54kK9D5V1yl6W8OMiJQfT6QB3lnR0jy8i%2BmBYZMKKUCs8IcQ%2Fa4QOuBEOu%2BUjDI9UodB58qyKjStbGEKxHLqyOeEc%2FOhikQhDXVcTl%2FibWrfg2GV53QiRinPFUxaYbtwfnsluYzrNkhsd1O%2Bwe4fgev4lwylGqGBjyMzMnWZhjZyJVILTIVKSUJyEZUN7PWy7v2vvpPontuWid%2F9s%2FzQ%3D%3D" /> */}

					<form className="rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5 md:col-span-2">
						<div className="px-4 py-6 sm:p-8">
							<div className="grid  grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
								<FormInput
									className="sm:col-span-4"
									register={register}
									name="name"
									type="text"
									label="Venue Name"
									errorMessage={errors.name?.message}
								/>

								<FormTextArea
									className="col-span-full"
									register={register}
									name="about"
									rows={3}
									label="About"
									placeholder="Enter description here"
									errorMessage={errors.about?.message}
								/>

								<FormInput
									className="col-span-full"
									register={register}
									name="images"
									type="image"
									label="Cover Photo"
									errorMessage={errors.images?.message}
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

					<form className="rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5 md:col-span-2">
						<div className="px-4 py-6 sm:p-8">
							<div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
								<FormInput
									className="sm:col-span-4"
									register={register}
									name="email"
									type="email"
									label="Contact Email"
									placeholder="example@domain.com"
									errorMessage={errors.email?.message}
								/>

								<FormInput
									className="sm:col-span-4"
									register={register}
									name="phoneNumber"
									type="text"
									label="Phone Number"
									placeholder="+1 (555) 987-6543"
									errorMessage={errors.phoneNumber?.message}
								/>

								<FormInput
									className="sm:col-span-4"
									register={register}
									name="website"
									type="text"
									label="Enter website (optional)"
									placeholder="www.example.com"
									errorMessage={errors.website?.message}
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

					<form className="rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5 md:col-span-2">
						<div className="px-4 py-6 sm:p-8">
							<div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
								<FormInput
									className="sm:col-span-4"
									register={register}
									name="courtNumber"
									type="number"
									label="Number of courts"
									errorMessage={errors.courtNumber?.message}
								/>

								<FormInput
									className="sm:col-span-4"
									register={register}
									name="hoursPerWeek"
									type="number"
									label="On average, how many hours per week will your venue be available for bookings?"
									errorMessage={errors.hoursPerWeek?.message}
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
							<div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
								<FormInput
									className="sm:col-span-4"
									register={register}
									name="pricePerHour"
									type="number"
									label="How much do you charge per hour?"
									errorMessage={errors.pricePerHour?.message}
								/>
							</div>
						</div>
					</form>
				</div>
				<div className="flex w-full justify-center">
					<ActionButton isLoading={isLoading} />
				</div>
			</form>
		</div>
	);
};
