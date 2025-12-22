import * as Yup from 'yup';

export const noteSchema = Yup.object()
  .shape({
    title: Yup.string()
      .trim()
      .min(1, 'Too short')
      .max(30, 'Too long')
      .required('Title is required'),
    content: Yup.string()
      .trim()
      .min(2, 'Too short')
      .max(3000, 'Too long')
      .required('Content is required'),
    tag: Yup.string().required('Tag is required'),
  })
  .required();
