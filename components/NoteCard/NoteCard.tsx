import css from './NoteCard.module.css';

export default function NoteCard() {
  return (
    <div className={css.cardContainer}>
      <h2 className={css.title}>Note title</h2>
      <p className={css.content}>Note content</p>
      <div className={css.footer}>
        <span className={css.tag}>Note tag</span>
        <button className={css.button}>Delete</button>
      </div>
    </div>
  );
}
