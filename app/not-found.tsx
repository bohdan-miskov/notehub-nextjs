import NotFoundPage from '@/components/NotFoundPage/NotFoundPage';
import { OG_IMAGE_URL } from '@/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'Sorry, the page you requested could not be found.',
  openGraph: {
    title: 'Page Not Found',
    description: 'Sorry, the page you requested could not be found.',
    siteName: 'NoteHub',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Page Not Found',
      },
    ],
    type: 'article',
  },
};

export default function NotFound() {
  return <NotFoundPage />;
}
