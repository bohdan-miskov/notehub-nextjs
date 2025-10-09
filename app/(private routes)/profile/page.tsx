import { getServerMe } from '@/lib/api/serverApi/userApi';
import Link from 'next/link';
import css from './page.module.css';
import { OG_IMAGE_URL, PAGE_BASE_URL } from '@/constants';
import Image from 'next/image';

export function generateMetadata() {
  return {
    title: 'My Profile — NoteHub',
    description:
      'View your personal profile on NoteHub — see your account details, manage your settings, and explore your notes in one place.',
    openGraph: {
      title: 'My Profile — NoteHub',
      description:
        'Manage your profile and personal settings on NoteHub — your modern space for ideas and organization.',
      url: `${PAGE_BASE_URL}/profile`,
      siteName: 'NoteHub',
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: 'My Profile — NoteHub',
        },
      ],
      type: 'article',
    },
  };
}

export default async function Profile() {
  const user = await getServerMe();

  return (
    <section className={css.section}>
      <div className={`container ${css.container}`}>
        <h1 className={css.title}>My Profile</h1>

        <div className={css.card}>
          <div className={css.avatarWrapper}>
            <Image
              src={user.avatar ?? '/default-avatar.svg'}
              alt={`${user.username}'s avatar`}
              width={120}
              height={120}
              className={css.avatar}
            />
          </div>

          <div className={css.info}>
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
      </div>
    </section>
  );
}
