import NotFoundPage from '@/components/NotFoundPage/NotFoundPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'Sorry, the page you requested could not be found.',
};

export default function NotFound() {
  return <NotFoundPage />;
}
