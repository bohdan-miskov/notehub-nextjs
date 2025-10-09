import NoteDetailsModalClient from '@/components/NoteDetailsModalClient/NoteDetailsModalClient';
import { OG_IMAGE_URL, PAGE_BASE_URL } from '@/constants';
import { getNoteById } from '@/lib/api/clientApi/noteApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const note = await getNoteById(id);
  return {
    title: note.title,
    description: note.content.slice(0, 30),
    openGraph: {
      title: note.title,
      description: note.content.slice(0, 100),
      url: `${PAGE_BASE_URL}/notes/${id}`,
      siteName: 'NoteHub',
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
      type: 'article',
    },
  };
}

export default async function NotePreview({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsModalClient />
    </HydrationBoundary>
  );
}
