import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { OG_IMAGE_URL, PAGE_BASE_URL } from '@/constants';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Note Hub',
  description:
    'Create, organize, and manage your notes effortlessly with our secure online note-taking app. Access your notes from anywhere, stay organized, and keep your ideas, tasks, and reminders in one convenient place.',
  openGraph: {
    title: 'Note Hub',
    description:
      'Create, organize, and manage your notes effortlessly with our secure online note-taking app. Access your notes from anywhere, stay organized, and keep your ideas, tasks, and reminders in one convenient place.',
    url: `${PAGE_BASE_URL}`,
    siteName: 'NoteHub',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Note Hub',
      },
    ],
    type: 'article',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <div id="__next">
          <TanStackProvider>
            <AuthProvider>
              <Header />
              <main>
                {children}
                {modal}
              </main>
              <Footer />
              <div id="modal-root"></div>
            </AuthProvider>
          </TanStackProvider>
        </div>
      </body>
    </html>
  );
}
