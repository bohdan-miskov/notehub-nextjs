import NoteListClient from '@/components/NoteListClient/NoteListClient';
import { TAG, TAGS_ARRAY } from '@/constants';
import { getNotes } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NoteListPage({ params }: Props) {
  const { slug } = await params;

  const tag = TAGS_ARRAY.includes(slug[0] as TAG)
    ? (slug[0] as TAG)
    : undefined;
  const searchParams = tag ? { tag } : undefined;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1],
    queryFn: () => getNotes(searchParams),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteListClient searchParams={searchParams} />
    </HydrationBoundary>
  );
}
