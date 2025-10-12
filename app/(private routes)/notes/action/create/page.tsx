import NoteForm from '@/components/NoteForm/NoteForm';
import css from './page.module.css';
import { OG_IMAGE_URL, PAGE_BASE_URL } from '@/constants';

export async function generateMetadata() {
  return {
    title: 'Create Note | NoteHub',
    description:
      'Write and save your ideas instantly with NoteHub. Create, edit, and organize notes effortlessly in one convenient place.',
    openGraph: {
      title: 'Create Note | NoteHub',
      description:
        'Write and save your ideas instantly with NoteHub. Create, edit, and organize notes effortlessly in one convenient place.',
      url: `${PAGE_BASE_URL}/notes/action/create`,
      siteName: 'NoteHub',
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: 'Create Note | NoteHub',
        },
      ],
      type: 'article',
    },
  };
}

export default function CreateNote() {
  return (
    <section className={css.container}>
      <h1 className={css.title}>Create note</h1>
      <p className={css.subtitle}>Capture your thoughts before they fade ✨</p>
      <NoteForm />
    </section>
  );
}
