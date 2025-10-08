import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .min(1, 'Too short')
    .max(30, 'Too long')
    .required('Username is required'),
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
