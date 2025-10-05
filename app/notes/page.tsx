import NoteListClient from '@/components/NoteListClient/NoteListClient';
import { getNotes } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export default async function NoteListPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1],
    queryFn: () => getNotes(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteListClient />
    </HydrationBoundary>
  );
}
