import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description:
    'Create, organize, and manage your notes effortlessly with our secure online note-taking app. Access your notes from anywhere, stay organized, and keep your ideas, tasks, and reminders in one convenient place.',
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div id="__next">
          <TanStackProvider>
            <Header />
            <main>
              {children}
              {modal}
            </main>
            <Footer />
            <div id="modal-root"></div>
          </TanStackProvider>
        </div>
      </body>
    </html>
  );
}
