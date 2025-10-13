'use client';

import { formatDateContent } from '@/utils/formatDate';
import css from './NoteDetailsModalClient.module.css';
import Modal from '../Modal/Modal';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import FullScreenLoader from '../FullScreenLoader/FullScreenLoader';
import { useEffect, useRef, useState } from 'react';
import { deleteNote, getNoteById } from '@/lib/api/clientApi/noteApi';
import Link from 'next/link';
import { DEFAULT_ERROR, ERROR_CODES, ERROR_MESSAGES } from '@/constants';
import { Note } from '@/types/note';
import ErrorToastMessage from '../ErrorToastMessage/ErrorToastMessage';
import { ErrorResponse } from '@/types/api';
import SuccessToastMessage from '../SuccessToastMessage/SuccessToastMessage';

export default function NoteDetailsModalClient() {
  const [isOpen, setIsOpen] = useState(true);
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const errorMessages = {
    ...ERROR_MESSAGES,
  };

  const query = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
    refetchOnMount: false,
  });

  const pathname = usePathname();
  const initialPath = useRef(pathname);

  useEffect(() => {
    setIsOpen(true);
    if (pathname !== initialPath.current) {
      setIsOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    setNote(query.data ?? null);
    if (query.error) {
      const err = query.error as unknown;

      const errorResponse: ErrorResponse = {
        status: (err as ErrorResponse)?.status ?? 500,
        message: (err as Error)?.message ?? DEFAULT_ERROR,
      };

      setError(errorResponse);
    }
  }, [query.data, query.isLoading, query.error]);

  async function handleDelete(id: string) {
    try {
      setIsLoading(true);
      setError(null);
      await deleteNote(id);
      setSuccessMessage('Successfully deleted !');
      router.back();
    } catch (error) {
      setError(error as ErrorResponse);
    } finally {
      setIsLoading(false);
    }
  }

  function onClose() {
    setIsOpen(false);
    setTimeout(() => router.back(), 300);
  }

  function onChangeRoute() {
    setIsOpen(false);
  }

  if (!note) return <p>Some error..</p>;

  const formattedDate = formatDateContent(note.createdAt, note.updatedAt);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>

            <div className={css.scrollArea}>
              <p className={css.content}>{note.content}</p>
            </div>

            <p className={css.date}>{formattedDate}</p>
            <div className={css.actions}>
              <Link
                className={css.editButton}
                href={`/notes/action/update/${id}`}
                onClick={onChangeRoute}
              >
                Edit
              </Link>
              <button
                className={css.deleteButton}
                onClick={() => handleDelete(note.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Modal>
      {isLoading && <FullScreenLoader text="Note loading ..." />}
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
