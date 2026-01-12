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
import SuccessToastMessage from '../SuccessToastMessage/SuccessToastMessage';
import GoogleLGoogleOAuthBtn from '../GoogleOAuthBtn/GoogleOAuthBtn';
import GoogleOAuthBtn from '../GoogleOAuthBtn/GoogleOAuthBtn';

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  //const setUser = useAuthStore(state => state.setUser);

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
      await login(values);
      // if (user) {
      //   setUser(user);
      setSuccessMessage('Successfully logged in !');
      router.push('/profile');
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
            autoComplete="username"
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
            autoComplete="current-password"
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
      <GoogleOAuthBtn />
      {isLoading && <FullScreenLoader text="Logging in..." />}
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
