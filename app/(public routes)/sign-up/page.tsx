import RegisterForm from '@/components/RegisterForm/RegisterForm';
import { OG_IMAGE_URL, PAGE_BASE_URL } from '@/constants';
import css from './page.module.css';

export function generateMetadata() {
  return {
    title: 'Create Account — NoteHub',
    description:
      'Join NoteHub today and start organizing your ideas with powerful tools for notes, tags, and collaboration.',
    openGraph: {
      title: 'Create Account — NoteHub',
      description:
        'Create your free NoteHub account and unlock a clean, modern space for your thoughts, notes, and inspiration.',
      url: `${PAGE_BASE_URL}/sign-up`,
      siteName: 'NoteHub',
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: 'Create Account — NoteHub',
        },
      ],
      type: 'article',
    },
  };
}

export default function SignUp() {
  return (
    <section className={css.section}>
      <div className={`container ${css.container}`}>
        <div className={css.wrapper}>
          <div className={css.textBlock}>
            <h1 className={css.title}>Create your account ✨</h1>
            <p className={css.subtitle}>
              Join NoteHub and start your journey toward better organization,
              creativity, and focus.
            </p>
          </div>

          <RegisterForm />

          <p className={css.loginHint}>
            Already have an account?{' '}
            <a href="/sign-in" className={css.link}>
              Log in
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
