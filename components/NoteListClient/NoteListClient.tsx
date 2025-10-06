'use client';

import { createNote, deleteNote, getNotes } from '@/lib/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import css from './NoteListClient.module.css';
import clsx from 'clsx';
import FullScreenLoader from '../FullScreenLoader/FullScreenLoader';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import { NoteCreatePayload, NotesSearchParams } from '@/types/note';

type Props = {
  searchParams: NotesSearchParams | undefined;
};

export default function NoteListClient({ searchParams }: Props) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
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

  async function handleCreateNote(payload: NoteCreatePayload) {
    await createNote(payload);
    queryClient.invalidateQueries({ queryKey: ['notes', search, page] });
  }

  function handleResetPagination() {
    setPage(1);
  }

  function onModalClose() {
    setModalOpen(false);
  }

  function onModalOpen() {
    setModalOpen(true);
  }

  if (isLoading) return <FullScreenLoader text="Notes loading ..." />;

  if (error || !data) return <p>Some error..</p>;

  return (
    <div>
      <section className={css.headerSection}>
        <div className={clsx('container', css.header)}>
          <SearchBox search={search} setSearch={setSearch} />
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          <button className={css.createBtn} onClick={onModalOpen}>
            Create note +
          </button>
        </div>
      </section>
      <NoteList notes={notes} handleDelete={handleDelete} />
      <Modal isOpen={modalOpen} onClose={onModalClose}>
        <NoteForm
          handleCreateNote={handleCreateNote}
          onClose={onModalClose}
          handleResetPagination={handleResetPagination}
        />
      </Modal>
    </div>
  );
}
