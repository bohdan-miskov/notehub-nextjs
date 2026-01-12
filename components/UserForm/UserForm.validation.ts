import * as Yup from 'yup';

export const userSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, 'Too short')
    .max(30, 'Too long')
    .required('Name is required'),
  avatar: Yup.mixed<File>()
    .nullable()
    .test('fileSize', 'Max size is 2MB', value => {
      return !value || (value && value?.size <= 1024 * 1024 * 2);
    })
    .test('fileType', 'Unsupported format', value => {
      return (
        !value ||
        (value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type))
      );
    }),
});
