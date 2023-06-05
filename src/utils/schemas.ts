import * as yup from 'yup';

/**
 * Schema for a one form input for email
 */
export const emailSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
});
export interface EmailSchemaType extends yup.InferType<typeof emailSchema> {}

export const passwordSchema  = yup.object().shape({
    password: yup.string().required('Password is required').min(8, 'Minimum 8 characters')
});

export interface passwordSchemaType extends yup.InferType<typeof passwordSchema> {}