"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "utils/schemas";

export function AuthPasswordForm2() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(signInSchema),
	});
	const onSubmit = (data: any) => console.log(data);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input {...register("email")} />
			<p>{errors.email?.message}</p>

			<input {...register("password")} />
			<p>{errors.password?.message}</p>

			<input type="submit" />
		</form>
	);
}
