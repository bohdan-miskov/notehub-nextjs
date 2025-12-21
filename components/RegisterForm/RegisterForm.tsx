'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import css from './RegisterForm.module.css';
import { useAuthStore } from '@/lib/stores/authStore';
import { register } from '@/lib/api/clientApi/authApi';
import { RegisterRequest } from '@/types/auth';
import { registerSchema } from './RegisterForm.validation';
import { useState } from 'react';
import ErrorToastMessage from '../ErrorToastMessage/ErrorToastMessage';
import FullScreenLoader from '../FullScreenLoader/FullScreenLoader';
import { useRouter } from 'next/navigation';
import { DEFAULT_ERROR, ERROR_CODES, ERROR_MESSAGES } from '@/constants';
import { ErrorResponse } from '@/types/api';
import SuccessToastMessage from '../SuccessToastMessage/SuccessToastMessage';

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const setUser = useAuthStore(state => state.setUser);

  const errorMessages = {
    ...ERROR_MESSAGES,
  };

  type Values = {
    name: string;
    email: string;
    password: string;
  };

  const initialValues: Values = {
    name: '',
    email: '',
    password: '',
  };

  async function handleSubmit(values: RegisterRequest) {
    try {
      setIsLoading(true);
      setError(null);
      const user = await register(values);
      if (user) {
        setUser(user);
        setSuccessMessage('Successfully registered !');
        router.push('/profile');
      }
    } catch (error) {
      setError(error as ErrorResponse);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={registerSchema}
      >
        <Form className={css.form}>
          <label className={css.label} htmlFor="name">
            name
          </label>
          <Field
            id="name"
            type="text"
            name="name"
            className={css.input}
            required
          />
          <ErrorMessage name="name" className={css.error} component="span" />

          <label className={css.label} htmlFor="email">
            Email
          </label>
          <Field
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
          <ErrorMessage name="email" className={css.error} component="span" />

          <label className={css.label} htmlFor="password">
            Password
          </label>
          <Field
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
          <ErrorMessage
            name="password"
            className={css.error}
            component="span"
          />

          <button className={css.btn} type="submit">
            Register
          </button>
        </Form>
      </Formik>
      {isLoading && <FullScreenLoader text="Registration..." />}
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
