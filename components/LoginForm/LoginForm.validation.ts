import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email()
    .min(1, 'Too short')
    .max(120, 'Too long')
    .required('Email is required'),
  password: Yup.string()
    .trim()
    .min(8, 'Too short')
    .max(120, 'Too long')
    .required('Password is required'),
});
