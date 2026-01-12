import { Note } from '@/types/note';
import css from './NoteCard.module.css';
import Link from 'next/link';

type Props = Pick<Note, 'id' | 'title' | 'content' | 'tag' | 'isDone'> & {
  handleDelete: (id: string) => Promise<void>;
};
export default function NoteCard({
  id,
  title,
  content,
  isDone,
  tag,
  handleDelete,
}: Props) {
  async function onDelete() {
    await handleDelete(id);
  }

  return (
    <div className={css.cardContainer}>
      {isDone && (
        <div className={css.checkContainer}>
          <svg
            width="18"
            height="18"
            className={css.checkIcon}
            aria-hidden="true"
          >
            <use href="/icons.svg#icon-check"></use>
          </svg>
        </div>
      )}
      <h2 className={css.title}>{title}</h2>
      <p className={css.content}>{content}</p>
      <div className={css.footer}>
        <span className={css.tag}>{tag}</span>
        <Link className={css.link} href={`/notes/${id}`} scroll={false}>
          Details
        </Link>
        <button className={css.button} onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
