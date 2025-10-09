import * as Yup from 'yup';

export const userSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .min(1, 'Too short')
    .max(30, 'Too long')
    .required('Username is required'),
});
