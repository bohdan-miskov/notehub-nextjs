'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import css from './UserForm.module.css';
import { UserData } from '@/types/auth';
import { useState } from 'react';
import ErrorToastMessage from '../ErrorToastMessage/ErrorToastMessage';
import FullScreenLoader from '../FullScreenLoader/FullScreenLoader';
import { useRouter } from 'next/navigation';
import { updateMe } from '@/lib/api/clientApi/userApi';
import { userSchema } from './UserForm.validation';
import { useAuthStore } from '@/lib/stores/authStore';
import clsx from 'clsx';
import { ErrorResponse } from '@/types/api';
import { DEFAULT_ERROR, ERROR_CODES, ERROR_MESSAGES } from '@/constants';
import SuccessToastMessage from '../SuccessToastMessage/SuccessToastMessage';

export default function UserForm() {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const errorMessages = {
    ...ERROR_MESSAGES,
  };

  type Values = {
    name: string;
  };

  const initialValues: Values = {
    name: user?.name ?? '',
  };

  async function handleSubmit(values: UserData) {
    try {
      setIsLoading(true);
      setError(null);
      const user = await updateMe(values);
      if (user) {
        setSuccessMessage('Successfully updated !');
        router.push('/profile');
      }
    } catch (error) {
      setError(error as ErrorResponse);
    } finally {
      setIsLoading(false);
    }
  }

  function handleCancel() {
    router.push('/profile');
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={userSchema}
      >
        <Form className={css.form}>
          <label className={css.label} htmlFor="name">
            Name
          </label>
          <Field
            id="name"
            type="text"
            name="name"
            className={css.input}
            required
          />
          <ErrorMessage name="name" className={css.error} component="span" />

          <div className={css.btnsContainer}>
            <button
              className={clsx(css.btn, css.cancel)}
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button className={clsx(css.btn, css.submit)} type="submit">
              Update
            </button>
          </div>
        </Form>
      </Formik>
      {isLoading && <FullScreenLoader text="Saving..." />}
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
