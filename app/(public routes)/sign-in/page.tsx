import LoginForm from '@/components/LoginForm/LoginForm';
import { OG_IMAGE_URL, PAGE_BASE_URL } from '@/constants';

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
    <section>
      <div className="container">
        <h1>Sign in</h1>
        <LoginForm />
      </div>
    </section>
  );
}
