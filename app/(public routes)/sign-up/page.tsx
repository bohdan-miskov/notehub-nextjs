import RegisterForm from '@/components/RegisterForm/RegisterForm';
import { OG_IMAGE_URL, PAGE_BASE_URL } from '@/constants';

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
    <section>
      <div className="container">
        <h1>Sign up</h1>
        <RegisterForm />
      </div>
    </section>
  );
}
