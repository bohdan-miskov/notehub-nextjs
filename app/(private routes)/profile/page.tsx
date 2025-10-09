import { getServerMe } from '@/lib/api/serverApi/userApi';
import Link from 'next/link';
import css from './page.module.css';

export default async function Profile() {
  const user = await getServerMe();

  return (
    <section className={css.section}>
      <div className={`container ${css.container}`}>
        <h1 className={css.title}>My Profile</h1>

        <div className={css.card}>
          <h2 className={css.subtitle}>Account Information</h2>
          <p className={css.field}>
            <span className={css.label}>Username:</span> {user.username}
          </p>
          <p className={css.field}>
            <span className={css.label}>Email:</span> {user.email}
          </p>

          <Link href="/profile/edit" className={css.editBtn}>
            Edit Profile
          </Link>
        </div>
      </div>
    </section>
  );
}
