'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import css from './RegisterForm.module.css';
import { useAuthStore } from '@/lib/stores/authStore';
import { register } from '@/lib/api/authApi';
import { ApiError, RegisterRequest } from '@/types/auth';
import { registerSchema } from './RegisterForm.validation';
import { useState } from 'react';
import { parseApiErrorMessage } from '@/utils/parseApiError';
import ErrorToastMessage from '../ErrorToastMessage/ErrorToastMessage';
import FullScreenLoader from '../FullScreenLoader/FullScreenLoader';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useAuthStore(state => state.setUser);

  type Values = {
    username: string;
    email: string;
    password: string;
  };

  const initialValues: Values = {
    username: '',
    email: '',
    password: '',
  };

  async function handleSubmit(values: RegisterRequest) {
    try {
      setIsLoading(true);
      const user = await register(values);
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
        validationSchema={registerSchema}
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
      {error && !isLoading && <ErrorToastMessage>{error}</ErrorToastMessage>}
    </>
  );
}
