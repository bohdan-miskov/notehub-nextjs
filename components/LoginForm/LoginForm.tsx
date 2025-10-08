'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import css from './RegisterForm.module.css';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/lib/stores/authStore';
import { ApiError, LoginRequest } from '@/types/auth';
import { useState } from 'react';
import { parseApiErrorMessage } from '@/utils/parseApiError';
import ErrorToastMessage from '../ErrorToastMessage/ErrorToastMessage';
import FullScreenLoader from '../FullScreenLoader/FullScreenLoader';
import { login } from '@/lib/api/authApi';
import { loginSchema } from './LoginForm.validation';

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useAuthStore(state => state.setUser);

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
      setError(parseApiErrorMessage(error as ApiError));
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
        <Form>
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

          <button type="submit">Log in</button>
        </Form>
      </Formik>
      {isLoading && <FullScreenLoader text="Logging in..." />}
      {error && !isLoading && <ErrorToastMessage>{error}</ErrorToastMessage>}
    </>
  );
}
