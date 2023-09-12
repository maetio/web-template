import React from "react";
import { CreateVenue } from "app/components/forms/create-venue";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { FormInput } from "app/components/forms";

export default function CreateVenuePage() {
	return (
		<main className="w-full min-w-full">
			<CreateVenue />
		</main>
	);
}
