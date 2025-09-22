'use client';

import { deleteNote, getNotes } from '@/lib/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';

export default function NoteListClient() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', search, page],
    queryFn: () => getNotes({ search, page }),
    refetchOnMount: false,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  async function handleDelete(id: string) {
    await deleteNote(id);
    //setNotes(prevNotes => prevNotes.filter(note => note.id != id));
    queryClient.invalidateQueries({ queryKey: ['notes', search, page] });
  }

  if (isLoading) return <p>Loading...</p>;

  if (error || !data) return <p>Some error..</p>;

  return (
    <div>
      <div>
        <SearchBox search={search} setSearch={setSearch} />
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
      <NoteList notes={notes} handleDelete={handleDelete} />
    </div>
  );
}
