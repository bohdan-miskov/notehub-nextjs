import UserForm from '@/components/UserForm/UserForm';
import css from './page.module.css';

export default function EditUser() {
  return (
    <section className={css.section}>
      <div className={`container ${css.container}`}>
        <div className={css.wrapper}>
          <div className={css.textBlock}>
            <h1 className={css.title}>Update your profile ⚙️</h1>
            <p className={css.subtitle}>
              Keep your account information up to date to make the most of your
              NoteHub experience.
            </p>
          </div>

          <UserForm />
        </div>
      </div>
    </section>
  );
}
