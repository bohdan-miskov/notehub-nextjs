'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import css from './NoteListClient.module.css';
import clsx from 'clsx';
import FullScreenLoader from '../FullScreenLoader/FullScreenLoader';
import { Note, NotesSearchParams } from '@/types/note';
import Link from 'next/link';
import { deleteNote, getNotes } from '@/lib/api/clientApi/noteApi';
import { DEFAULT_ERROR, ERROR_CODES, ERROR_MESSAGES } from '@/constants';
import ErrorToastMessage from '../ErrorToastMessage/ErrorToastMessage';
import { ErrorResponse } from '@/types/api';
import SuccessToastMessage from '../SuccessToastMessage/SuccessToastMessage';

type Props = {
  searchParams: NotesSearchParams | undefined;
};

export default function NoteListClient({ searchParams }: Props) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const errorMessages = {
    ...ERROR_MESSAGES,
  };

  const query = useQuery({
    queryKey: ['notes', search, page],
    queryFn: () => getNotes({ ...searchParams, search, page }),
    refetchOnMount: false,
  });

  useEffect(() => {
    setNotes(query.data?.data ?? []);
    setTotalPages(query.data?.totalPages ?? 0);
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
    await deleteNote(id);
    //setNotes(prevNotes => prevNotes.filter(note => note.id != id));
    setSuccessMessage('Successfully deleted !');
    queryClient.invalidateQueries({ queryKey: ['notes', search, page] });
  }

  // function handleResetPagination() {
  //   setPage(1);
  // }

  return (
    <>
      <div>
        <section className={css.headerSection}>
          <div className={clsx('container', css.header)}>
            <SearchBox search={search} setSearch={setSearch} />
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
            <Link className={css.createBtn} href="/notes/action/create">
              Create note +
            </Link>
          </div>
          {(search || searchParams?.tag) && (
            <div className="container">
              <div className={css.currentFilters}>
                {search && <span>Search: “{search}”</span>}
                {searchParams?.tag && <span>Tag: {searchParams.tag}</span>}
              </div>
            </div>
          )}
        </section>
        <NoteList notes={notes} handleDelete={handleDelete} />
      </div>
      {isLoading && <FullScreenLoader text="Notes loading ..." />}
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
