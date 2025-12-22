import * as Yup from 'yup';

export const userSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, 'Too short')
    .max(30, 'Too long')
    .required('Name is required'),
});
