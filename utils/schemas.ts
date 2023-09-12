import * as yup from "yup";

/*
 * Schema for a one form input for email
 */
export const emailSchema = yup.object().shape({
	email: yup.string().email("Invalid email").required("Email is required"),
});
export type EmailSchemaType = yup.InferType<typeof emailSchema>;

export const passwordSchema = yup.object().shape({
	password: yup
		.string()
		.required("Password is required")
		.min(8, "Minimum 8 characters"),
});

export type PasswordSchemaType = yup.InferType<typeof passwordSchema>;

/**
 * File defines varies yup schemas to be used for form validation
 */
export const signInSchema = yup.object().shape({
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup
		.string()
		.required("Password is required")
		.min(8, "Minimum 8 characters"),
});
export type SignInSchemaType = yup.InferType<typeof signInSchema>;

/**
 * File defines varies yup schemas to be used for form validation
 */
export const updateUserPasswordSchema = yup.object().shape({
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup
		.string()
		.required("Password is required")
		.min(8, "Minimum 8 characters"),
	newPassword: yup
		.string()
		.required("Password is required")
		.min(8, "Minimum 8 characters"),
});
export type UpdateUserPasswordSchemaType = yup.InferType<
	typeof updateUserPasswordSchema
>;

/**
 * Password and confirm password schema
 */
export const signupSchema = yup.object().shape({
	firstName: yup.string(),
	lastName: yup.string(),
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup
		.string()
		.required("Password is required")
		.min(8, "Minimum 8 characters"),
	confirmPassword: yup
		.string()
		.test({
			name: "confirmPassword",
			message: "Passwords must match",
			test() {
				const { password, confirmPassword } = this.parent;
				if (password && confirmPassword !== password) {
					return false;
				}
				return true;
			},
		})
		.required("Confirm Password is required"),
});
export type SignupSchemaType = yup.InferType<typeof signupSchema>;

export const CompetitionFormSchema = yup.object().shape({
	competitionName: yup.string().required("Session name is required.").min(4),
	sport: yup.string().required("Sport selection is required"),
	competitionType: yup.string().required("Competition Type is required"),
	startDate: yup.date().required("Start Date is required"),
	startTime: yup.date().required("Start Time is required"),
	endDate: yup.date().required("End Date is required"),
	endTime: yup.date().required("End Time is required"),
	location: yup.string().required("Location is required"),
});

export type CompFormSchema = yup.InferType<typeof CompetitionFormSchema>;

// New schema for editing profile
export const editProfileSchema = yup.object().shape({
	firstName: yup.string(),
	lastName: yup.string(),
});
export type EditProfileSchemaType = yup.InferType<typeof editProfileSchema>;

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

/**
 * venue schema for creating venues
 */
export const venueSchema = yup.object().shape({
	name: yup.string().required("Venue name is required"),
	about: yup.string(),
	image: yup.mixed().required("image is required to show off your venue"),
	email: yup.string().email("Invalid email").required("Email is required"),
	phoneNumber: yup
		.string()
		.matches(phoneRegExp, "Phone number is not valid")
		.required("phone number is required"),
	website: yup.string(),
	courtNumber: yup.number().required("court number is required"),
	hoursPerWeek: yup
		.number()
		.required("hour per week is required to calculate "),
	pricePerHour: yup
		.number()
		.required("price is required. Please put 0 if it is free"),
});
export type VenueSchemaType = yup.InferType<typeof signupSchema>;
