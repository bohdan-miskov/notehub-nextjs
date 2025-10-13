'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import css from './NoteForm.module.css';
import { Note, NoteCreatePayload } from '@/types/note';
import {
  DEFAULT_ERROR,
  ERROR_CODES,
  ERROR_MESSAGES,
  TAG,
  TAGS_ARRAY,
} from '@/constants';
import { SelectField } from '../FormikSelectField/FormikSelectField';
import { noteSchema } from './NoteForm.validation';
import { useRouter } from 'next/navigation';
import { useNoteDraftStore } from '@/lib/stores/noteStore';
import FullScreenLoader from '../FullScreenLoader/FullScreenLoader';
import { createNote, updateNote } from '@/lib/api/clientApi/noteApi';
import { useState } from 'react';
import ErrorToastMessage from '../ErrorToastMessage/ErrorToastMessage';
import { ErrorResponse } from '@/types/api';
import SuccessToastMessage from '../SuccessToastMessage/SuccessToastMessage';

type Props = {
  note?: Note;
};

export default function NoteForm({ note }: Props) {
  const router = useRouter();
  const { draft, hasHydrated, setDraft, clearDraft } = useNoteDraftStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const errorMessages = {
    ...ERROR_MESSAGES,
  };

  // const { mutate } = useMutation({
  //   mutationFn: (
  //     data: NoteCreatePayload | { id: string; payload: NoteCreatePayload }
  //   ) => {
  //     if ('id' in data) {
  //       return updateNote(data);
  //     }
  //     return createNote(data as NoteCreatePayload);
  //   },
  //   onSuccess: () => {
  //     clearDraft();
  //     router.replace(`/notes/filter/all`);
  //   },
  // });

  type InitialValues = {
    title: string;
    content: string;
    tag: TAG;
  };

  const initialValues: InitialValues = note
    ? {
        title: note.title,
        content: note.content,
        tag: note.tag,
      }
    : draft;

  async function handleSubmit(values: NoteCreatePayload) {
    try {
      setIsLoading(true);
      setError(null);
      let newNote;
      if (note) {
        newNote = await updateNote({ payload: values, id: note.id });
        setSuccessMessage('Successfully updated !');
        // mutate({ payload: values, id: note.id });
      } else {
        newNote = await createNote(values);
        setSuccessMessage('Successfully added !');
        clearDraft();
        // mutate(values);
      }
      router.push(`/notes/${newNote.id}`);
    } catch (error) {
      setError(error as ErrorResponse);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSetDraft(values: NoteCreatePayload) {
    if (!note) {
      setDraft(values);
    }
  }

  function onClose() {
    router.back();
  }

  const tagOptions = TAGS_ARRAY.map(tag => {
    return { label: tag, value: tag };
  });

  if (!hasHydrated) return <FullScreenLoader text="Loading draft..." />;

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={noteSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => {
          function onChange(e: React.ChangeEvent<HTMLInputElement>) {
            handleChange(e);

            handleSetDraft({ ...values, [e.target.name]: e.target.value });
          }
          return (
            <Form className={css.form}>
              <div className={css.formGroup}>
                <label className={css.label} htmlFor="title">
                  Title
                </label>
                <Field
                  id="title"
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={onChange}
                  className={css.input}
                />
                <ErrorMessage
                  name="title"
                  className={css.error}
                  component="span"
                />
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
                  value={values.content}
                  onChange={onChange}
                  className={css.textarea}
                />
                <ErrorMessage
                  name="content"
                  className={css.error}
                  component="span"
                />
              </div>

              <div className={css.formGroup}>
                <label className={css.label} htmlFor="tag">
                  Tag
                </label>
                <SelectField
                  name="tag"
                  options={tagOptions}
                  className={css.select}
                  onChange={value =>
                    handleSetDraft({ ...values, tag: value ?? TAGS_ARRAY[0] })
                  }
                />
                <ErrorMessage
                  name="tag"
                  className={css.error}
                  component="span"
                />
              </div>

              <div className={css.actions}>
                <button
                  type="button"
                  onClick={onClose}
                  className={css.cancelButton}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={css.submitButton}
                  disabled={false}
                >
                  {note ? 'Update note' : 'Create note'}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
      {isLoading && <FullScreenLoader text="Action loading ..." />}
      {error && !isLoading && (
        <ErrorToastMessage>
          {errorMessages[error.status as ERROR_CODES] ?? DEFAULT_ERROR}
        </ErrorToastMessage>
      )}
      {successMessage && !isLoading && (
        <SuccessToastMessage>{successMessage}</SuccessToastMessage>
      )}
    </>
  );
}
