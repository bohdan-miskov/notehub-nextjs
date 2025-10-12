'use client';

import { formatDateContent } from '@/utils/formatDate';
import css from './NoteDetailsModalClient.module.css';
import Modal from '../Modal/Modal';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import FullScreenLoader from '../FullScreenLoader/FullScreenLoader';
import { useState } from 'react';
import { deleteNote, getNoteById } from '@/lib/api/clientApi/noteApi';
import Link from 'next/link';

export default function NoteDetailsModalClient() {
  const [isOpen, setIsOpen] = useState(true);
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

  function onClose() {
    setIsOpen(false);
    setTimeout(() => router.back(), 300);
  }

  function onChangeRoute() {
    setIsOpen(false);
  }

  async function handleDelete(id: string) {
    await deleteNote(id);
    router.back();
  }

  if (isLoading) return <FullScreenLoader text="Note loading ..." />;

  if (error || !note) return <p>Some error..</p>;

  const formattedDate = formatDateContent(note.createdAt, note.updatedAt);

  return (
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
  );
}
