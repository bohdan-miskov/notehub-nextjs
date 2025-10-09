'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import css from './UserForm.module.css';
import { ApiError, UserData } from '@/types/auth';
import { useState } from 'react';
import { parseApiErrorMessage } from '@/utils/parseApiError';
import ErrorToastMessage from '../ErrorToastMessage/ErrorToastMessage';
import FullScreenLoader from '../FullScreenLoader/FullScreenLoader';
import { useRouter } from 'next/navigation';
import { updateMe } from '@/lib/api/clientApi/userApi';
import { userSchema } from './UserForm.validation';
import { useAuthStore } from '@/lib/stores/authStore';
import clsx from 'clsx';

export default function UserForm() {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  type Values = {
    username: string;
  };

  const initialValues: Values = {
    username: user?.username ?? '',
  };

  async function handleSubmit(values: UserData) {
    try {
      setIsLoading(true);
      const user = await updateMe(values);
      if (user) {
        router.push('/profile');
      }
    } catch (error) {
      setError(parseApiErrorMessage(error as ApiError));
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
          <label className={css.label} htmlFor="username">
            Username
          </label>
          <Field
            id="username"
            type="text"
            name="userName"
            className={css.input}
            required
          />
          <ErrorMessage
            name="username"
            className={css.error}
            component="span"
          />

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
      {error && !isLoading && <ErrorToastMessage>{error}</ErrorToastMessage>}
    </>
  );
}
