'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import css from './NoteForm.module.css';
import { NoteCreatePayload } from '@/types/note';
import { TAG, TAGS_ARRAY } from '@/constants';
import { SelectField } from '../FormikSelectField/FormikSelectField';
import { noteSchema } from './NoteForm.validation';
import { createNote } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

// type Props = {
//   onClose: () => void;
//   handleCreateNote: (values: NoteCreatePayload) => Promise<void>;
// };

export default function NoteForm() {
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      router.push('/notes/filter/all');
    },
  });

  // function handleSubmit(formData: FormData) {
  //   const values = Object.fromEntries(formData) as NoteCreatePayload;
  //   mutate(values);
  // }

  const handleSubmit = async (values: NoteCreatePayload) => {
    mutate(values);
  };

  function onClose() {
    router.push('/notes/filter/all');
  }

  const tagOptions = TAGS_ARRAY.map(tag => {
    return { label: tag, value: tag };
  });
  const initialValues: NoteCreatePayload = {
    title: '',
    content: '',
    tag: TAG.Todo,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={noteSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label className={css.label} htmlFor="title">
            Title
          </label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" className={css.error} component="span" />
        </div>

        <div className={css.formGroup}>
          <label className={css.label} htmlFor="content">
            Content
          </label>
          <Field
            id="content"
            name="content"
            rows={8}
            as="textarea"
            className={css.textarea}
          />
          <ErrorMessage name="content" className={css.error} component="span" />
        </div>

        <div className={css.formGroup}>
          <label className={css.label} htmlFor="tag">
            Tag
          </label>
          <SelectField name="tag" options={tagOptions} className={css.select} />
          <ErrorMessage name="tag" className={css.error} component="span" />
        </div>

        <div className={css.actions}>
          <button type="button" onClick={onClose} className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
