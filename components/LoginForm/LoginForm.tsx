'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import css from './LoginForm.module.css';
import { useAuthStore } from '@/lib/stores/authStore';
import { LoginRequest } from '@/types/auth';
import { useState } from 'react';
import ErrorToastMessage from '../ErrorToastMessage/ErrorToastMessage';
import FullScreenLoader from '../FullScreenLoader/FullScreenLoader';
import { login } from '@/lib/api/clientApi/authApi';
import { loginSchema } from './LoginForm.validation';
import { useRouter } from 'next/navigation';
import { DEFAULT_ERROR, ERROR_CODES, ERROR_MESSAGES } from '@/constants';
import { ErrorResponse } from '@/types/api';

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useAuthStore(state => state.setUser);

  const errorMessages = {
    ...ERROR_MESSAGES,
  };

  type Values = {
    email: string;
    password: string;
  };

  const initialValues: Values = {
    email: '',
    password: '',
  };

  async function handleSubmit(values: LoginRequest) {
    try {
      setIsLoading(true);
      const user = await login(values);
      if (user) {
        setUser(user);
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
        validationSchema={loginSchema}
      >
        <Form className={css.form}>
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
            Log in
          </button>
        </Form>
      </Formik>
      {isLoading && <FullScreenLoader text="Logging in..." />}
      {error && !isLoading && (
        <ErrorToastMessage>
          {errorMessages[error.status as ERROR_CODES] ?? DEFAULT_ERROR}
        </ErrorToastMessage>
      )}
    </>
  );
}
