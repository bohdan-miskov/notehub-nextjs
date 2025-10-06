'use client';

import { useParams } from 'next/navigation';
import css from './NoteDetailsClient.module.css';
import { useQuery } from '@tanstack/react-query';
import { getNoteById } from '@/lib/api';
import { formatDateContent } from '@/utils/formatDate';
import FullScreenLoader from '../FullScreenLoader/FullScreenLoader';

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <FullScreenLoader text="Note loading ..." />;

  if (error || !note) return <p>Some error..</p>;

  const formattedDate = formatDateContent(note.createdAt, note.updatedAt);

  return (
    <section>
      <div className="container">
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{formattedDate}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
