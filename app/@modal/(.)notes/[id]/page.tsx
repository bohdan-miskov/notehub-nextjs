import NoteDetailsModalClient from '@/components/NoteDetailsModalClient/NoteDetailsModalClient';
import { getNoteById } from '@/lib/api';
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
      <NoteDetailsModalClient isOpen={true} />
    </HydrationBoundary>
  );
}
