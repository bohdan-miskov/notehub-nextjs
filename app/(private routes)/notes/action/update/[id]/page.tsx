'use client';

import NoteForm from '@/components/NoteForm/NoteForm';
import css from './page.module.css';
import { useQuery } from '@tanstack/react-query';
import { getNoteById } from '@/lib/api/clientApi/noteApi';
import FullScreenLoader from '@/components/FullScreenLoader/FullScreenLoader';
import { Note } from '@/types/note';

type Props = {
  params: { id: string };
};

export default function UpdateNote({ params }: Props) {
  const { id } = params;

  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note, Error>({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
  });

  if (isLoading) return;

  return (
    <section className={css.container}>
      <h1 className={css.title}>Update note</h1>
      <p className={css.subtitle}>Change ideas at any time ✨</p>
      <NoteForm note={note} />
      {isLoading && <FullScreenLoader text="Loading note..." />}
    </section>
  );
}
