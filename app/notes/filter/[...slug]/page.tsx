import NoteListClient from '@/components/NoteListClient/NoteListClient';
import { getNotes } from '@/lib/api';
import { parseTagFromArray } from '@/utils/parseTag';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const tag = parseTagFromArray(slug) ?? 'all';
  return {
    title: tag === 'all' ? 'All Notes' : `Notes – ${tag}`,
    description:
      tag === 'all'
        ? 'View and manage all your saved notes in one place.'
        : `Browse notes tagged with "${tag}".`,
  };
}

export default async function NoteListPage({ params }: Props) {
  const { slug } = await params;
  const tag = parseTagFromArray(slug);
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
