import NoteListClient from '@/components/NoteListClient/NoteListClient';
import { OG_IMAGE_URL, PAGE_BASE_URL } from '@/constants';
import { getTags } from '@/lib/api/clientApi/noteApi';
import { getNotesServer, getTagsServer } from '@/lib/api/serverApi/noteApi';
import { parseTagFromArray } from '@/utils/parseTag';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
  const tags = await getTags();

  const paths = tags.map((tag: string) => ({
    slug: [tag],
  }));

  paths.push({ slug: ['All'] });

  return paths;
}

export const dynamicParams = true;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const tags = await getTagsServer();
  const tag = parseTagFromArray(tags, slug) ?? 'All';
  return {
    title: tag === 'All' ? 'All Notes' : `Notes – ${tag}`,
    description:
      tag === 'All'
        ? 'View and manage all your saved notes in one place.'
        : `Browse notes tagged with "${tag}".`,
    openGraph: {
      title: tag === 'All' ? 'All Notes' : `Notes – ${tag}`,
      description:
        tag === 'All'
          ? 'View and manage all your saved notes in one place.'
          : `Browse notes tagged with "${tag}".`,
      url: `${PAGE_BASE_URL}/notes/filter/${tag}`,
      siteName: 'NoteHub',
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: tag === 'All' ? 'All Notes' : `Notes – ${tag}`,
        },
      ],
      type: 'article',
    },
  };
}

export default async function NoteListPage({ params }: Props) {
  const { slug } = await params;
  const tags = await getTagsServer();
  const tag = parseTagFromArray(tags, slug);
  const searchParams = tag ? { tag } : undefined;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1],
    queryFn: () => getNotesServer(searchParams),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteListClient searchParams={searchParams} />
    </HydrationBoundary>
  );
}
