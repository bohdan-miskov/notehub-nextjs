'use client';

import { formatDateContent } from '@/utils/formatDate';
import css from './NoteDetailsModalClient.module.css';
import Modal from '../Modal/Modal';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getNoteById } from '@/lib/api';
import FullScreenLoader from '../FullScreenLoader/FullScreenLoader';

type Props = {
  isOpen: boolean;
};

export default function NoteDetailsModalClient(
  { isOpen }: Props = { isOpen: true }
) {
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
    router.back();
  }

  if (isLoading) return <FullScreenLoader text="Note loading ..." />;

  if (error || !note) return <p>Some error..</p>;

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
          </div>
        </div>
      </Modal>
    </>
  );
}
