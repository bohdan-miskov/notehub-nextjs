import { Note } from '@/types/note';
import css from './NoteCard.module.css';
import Link from 'next/link';

type Props = Pick<Note, 'id' | 'title' | 'content' | 'tag'> & {
  handleDelete: (id: string) => Promise<void>;
};
export default function NoteCard({
  id,
  title,
  content,
  tag,
  handleDelete,
}: Props) {
  async function onDelete() {
    await handleDelete(id);
  }

  return (
    <div className={css.cardContainer}>
      <h2 className={css.title}>{title}</h2>
      <p className={css.content}>{content}</p>
      <div className={css.footer}>
        <span className={css.tag}>{tag}</span>
        <Link href={`/notes/${id}`}>Details</Link>
        <button className={css.button} onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
