'use client';

import { useParams, useRouter } from 'next/navigation';
import css from './NoteDetailsClient.module.css';
import { useQuery } from '@tanstack/react-query';
import { formatDateContent } from '@/utils/formatDate';
import FullScreenLoader from '../FullScreenLoader/FullScreenLoader';
import { deleteNote, getNoteById } from '@/lib/api/clientApi/noteApi';
import Link from 'next/link';

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
    refetchOnMount: false,
  });

  async function handleDelete(id: string) {
    await deleteNote(id);
    router.back();
  }

  if (error || !note) return <p>Some error..</p>;

  const formattedDate = formatDateContent(note.createdAt, note.updatedAt);

  return (
    <section>
      <div className="container">
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
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
    </section>
  );
}
