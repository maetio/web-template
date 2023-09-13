import React from "react";
import { CreateVenue } from "app/components/forms/create-venue";

export default function CreateVenuePage() {
	return (
		<main className="px-10">
			<h2 className="w-[872px] text-[32px] font-bold tracking-wide text-black">
				Create Venue
			</h2>
			<CreateVenue />
		</main>
	);
}
