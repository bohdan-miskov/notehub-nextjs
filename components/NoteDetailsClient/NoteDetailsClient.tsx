'use client';

import { useParams, useRouter } from 'next/navigation';
import css from './NoteDetailsClient.module.css';
import { useQuery } from '@tanstack/react-query';
import { formatDateContent } from '@/utils/formatDate';
import FullScreenLoader from '../FullScreenLoader/FullScreenLoader';
import { deleteNote, getNoteById } from '@/lib/api/clientApi/noteApi';
import Link from 'next/link';
import ErrorToastMessage from '../ErrorToastMessage/ErrorToastMessage';
import { useEffect, useState } from 'react';
import { Note } from '@/types/note';
import { DEFAULT_ERROR, ERROR_CODES, ERROR_MESSAGES } from '@/constants';
import { ErrorResponse } from '@/types/api';
import SuccessToastMessage from '../SuccessToastMessage/SuccessToastMessage';

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    setNote(query.data ?? null);
    setIsLoading(query.isLoading);
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

  if (!note) return <p>Some error..</p>;

  const formattedDate = formatDateContent(note.createdAt, note.updatedAt);

  return (
    <section>
      <div className="container">
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>
                {note.title}
                {note.isDone && <span className={css.titleAccent}>(Done)</span>}
              </h2>
              <div className={css.actions}>
                <Link
                  className={css.editButton}
                  href={`/notes/action/update/${id}`}
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
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{formattedDate}</p>
          </div>
        </div>
      </div>
      {isLoading && <FullScreenLoader text="Note loading ..." />}
      {error && !isLoading && (
        <ErrorToastMessage>
          {errorMessages[error.status as ERROR_CODES] ?? DEFAULT_ERROR}
        </ErrorToastMessage>
      )}
      {successMessage && !isLoading && (
        <SuccessToastMessage>{successMessage}</SuccessToastMessage>
      )}
    </section>
  );
}
