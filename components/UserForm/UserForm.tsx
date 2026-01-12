'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import css from './UserForm.module.css';
import { UserUpdateData } from '@/types/auth';
import { useEffect, useState } from 'react';
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
import Image from 'next/image';
import { compressImage } from '@/utils/compressImage';

export default function UserForm() {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);
  const [preview, setPreview] = useState<string | null>(user?.avatar ?? null);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const errorMessages = {
    ...ERROR_MESSAGES,
  };

  type Values = {
    name: string;
    avatar: File | null;
  };

  const initialValues: Values = {
    name: user?.name ?? '',
    avatar: null,
  };

  async function handleSubmit(values: UserUpdateData) {
    try {
      setIsLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append('name', values.name);
      if (values.avatar) {
        formData.append('avatar', values.avatar);
      }
      const user = await updateMe(formData);
      setUser(user);
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

  useEffect(() => {
    if (user?.avatar) {
      setPreview(user.avatar);
    }
  }, [user]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={userSchema}
        enableReinitialize={true}
      >
        {({ setFieldValue }) => {
          async function onAvatarChange(
            e: React.ChangeEvent<HTMLInputElement>
          ) {
            if (e.currentTarget?.files) {
              const file = e.currentTarget?.files[0];
              let compressedFile;
              try {
                compressedFile = await compressImage(file, { maxSizeMB: 2 });
              } catch {
                compressedFile = file;
              }
              setFieldValue('avatar', compressedFile);
              setPreview(URL.createObjectURL(compressedFile));
            }
          }
          return (
            <Form className={css.form}>
              <label className={css.imageUpload} htmlFor="avatar">
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="image/*"
                  className="visually-hidden"
                  onChange={e => onAvatarChange(e)}
                />

                {preview ? (
                  <Image
                    src={preview}
                    alt="avatar"
                    width={150}
                    height={150}
                    className={css.avatar}
                    priority
                  />
                ) : (
                  <div className={css.uploadDefault}>
                    <svg>
                      <use href="/icons.svg#icon-photo"></use>
                    </svg>
                  </div>
                )}
              </label>
              <ErrorMessage
                name="avatar"
                className={css.error}
                component="span"
              />
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
              <ErrorMessage
                name="name"
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
          );
        }}
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
