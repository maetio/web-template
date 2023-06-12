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

export type passwordSchemaType = yup.InferType<typeof passwordSchema>;

export const competitionFormSchema = yup.object().shape({
  competitionName: yup.string().required("Session name is required.").min(4),
  sport: yup.string().required("Sport selection is required"),
  competitionType: yup.string().required("Competition Type is required"),
  startDate: yup.date().required("Start Date is required"),
  startTime: yup.date().required("Start Time is required"),
  endDate: yup.date().required("End Date is required"),
  endTime: yup.date().required("End Time is required"),
  location: yup.string().required("Location is required"),
});

export type competitionFormSchema = yup.InferType<typeof competitionFormSchema>;
