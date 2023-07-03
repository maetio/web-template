"use client";

import { useTransition } from "react";
import { updateUserNameClient } from "actions/server/example-mutation";
import {
	Button,
	TextField,
} from "app/components/providers/mui-server-components";
import { EditProfileSchemaType, editProfileSchema } from "app/utils/schemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

/**
 * an example of using a server action inside a client component. 
 * @remarks
 * used the useTransition hook like the next documentation recommended here
 * https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions#custom-invocation-without-starttransition
 *
 * @export
 * @return {*} 
 */
export function ExampleMutationClient() {
	// form validation on client
	const { register, handleSubmit, reset } = useForm({
		defaultValues: {
			firstName: "",
			lastName: "",
		},
		resolver: yupResolver(editProfileSchema),
	});

	// useTransition is used to handle loading state inside client component
	const [handleUserCounterAction, startTransition] = useTransition();

	// handle the transaction without returning a promise(since useTransition can't take in promises)
	const handleTransaction = ({
		firstName,
		lastName,
	}: EditProfileSchemaType) => {
		async function transitionWrapper() {
			if (firstName && lastName)
				await updateUserNameClient({ firstName, lastName });
		}
		transitionWrapper();
	};

	return (
		<form className="flex gap-2 items-center">
			<TextField
				{...register("firstName", { required: true })}
				sx={{ m: 3 }}
				label="First Name"
			></TextField>
			<TextField
				{...register("lastName", { required: true })}
				label="Last Name"
			></TextField>
			<Button
				// loading={handleUserCounterAction}
				disabled={handleUserCounterAction}
				onClick={() => startTransition(handleSubmit(handleTransaction))}
				variant="outlined"
				type="submit"
				sx={{ m: 2 }}
			>
				Submit
			</Button>
		</form>
	);
}
