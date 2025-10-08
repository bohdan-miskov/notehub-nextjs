'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import css from './NoteListClient.module.css';
import clsx from 'clsx';
import FullScreenLoader from '../FullScreenLoader/FullScreenLoader';
import { NotesSearchParams } from '@/types/note';
import Link from 'next/link';
import { deleteNote, getNotes } from '@/lib/api/noteApi';

type Props = {
  searchParams: NotesSearchParams | undefined;
};

export default function NoteListClient({ searchParams }: Props) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', search, page],
    queryFn: () => getNotes({ ...searchParams, search, page }),
    refetchOnMount: false,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  async function handleDelete(id: string) {
    await deleteNote(id);
    //setNotes(prevNotes => prevNotes.filter(note => note.id != id));
    queryClient.invalidateQueries({ queryKey: ['notes', search, page] });
  }

  // function handleResetPagination() {
  //   setPage(1);
  // }

  if (isLoading) return <FullScreenLoader text="Notes loading ..." />;

  if (error || !data) return <p>Some error..</p>;

  return (
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
  );
}
