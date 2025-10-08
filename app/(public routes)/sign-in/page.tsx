import LoginForm from '@/components/LoginForm/LoginForm';
import { OG_IMAGE_URL, PAGE_BASE_URL } from '@/constants';
import css from './page.module.css';

export function generateMetadata() {
  return {
    title: 'Login — NoteHub',
    description:
      'Sign in to your NoteHub account to access your notes, manage tags, and stay productive anywhere.',
    openGraph: {
      title: 'Login — NoteHub',
      description:
        'Log in to NoteHub and instantly access your secure workspace for notes and ideas. Continue where you left off.',
      url: `${PAGE_BASE_URL}/sign-in`,
      siteName: 'NoteHub',
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: 'Login — NoteHub',
        },
      ],
      type: 'article',
    },
  };
}

export default function SignIn() {
  return (
    <section className={css.section}>
      <div className={`container ${css.container}`}>
        <div className={css.wrapper}>
          <div className={css.textBlock}>
            <h1 className="visually-hidden">Log in</h1>
            <p className={css.title}>Welcome back 👋</p>
            <p className={css.subtitle}>
              Sign in to your account to continue organizing your thoughts and
              turning ideas into action.
            </p>
          </div>

          <LoginForm />

          <p className={css.registerHint}>
            Don’t have an account?{' '}
            <a href="/sign-up" className={css.link}>
              Create one
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
