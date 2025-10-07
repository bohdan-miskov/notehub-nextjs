import NoteForm from '@/components/NoteForm/NoteForm';
import css from './page.module.css';

export default function CreateNote() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Create note</h1>
      <NoteForm />
    </div>
  );
}
