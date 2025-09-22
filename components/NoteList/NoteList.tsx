import { Note } from '@/types/note';
import css from './NoteList.module.css';
import NoteCard from '../NoteCard/NoteCard';

type Props = {
  notes: Note[];
  handleDelete: (id: string) => Promise<void>;
};

export default function NoteList({ notes, handleDelete }: Props) {
  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li key={id}>
          <NoteCard
            id={id}
            title={title}
            content={content}
            tag={tag}
            handleDelete={handleDelete}
          />
        </li>
      ))}
    </ul>
  );
}
