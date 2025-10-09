import UserForm from '@/components/UserForm/UserForm';
import css from './page.module.css';
import { OG_IMAGE_URL, PAGE_BASE_URL } from '@/constants';

export function generateMetadata() {
  return {
    title: 'Edit Profile — NoteHub',
    description:
      'Update your name or other personal details in your NoteHub profile. Manage your account easily and securely.',
    openGraph: {
      title: 'Edit Profile — NoteHub',
      description:
        'Edit your personal information and keep your NoteHub profile up to date — a safe and simple way to manage your account.',
      url: `${PAGE_BASE_URL}/profile/edit`,
      siteName: 'NoteHub',
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: 'Edit Profile — NoteHub',
        },
      ],
      type: 'article',
    },
  };
}

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
