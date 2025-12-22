import { TAGS_QUERY_KEY } from '@/constants';
import { getTagsServer } from '@/lib/api/serverApi/noteApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

type Props = {
  children: React.ReactNode;
};

const NotesLayout = async ({ children }: Props) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [TAGS_QUERY_KEY],
    queryFn: getTagsServer,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default NotesLayout;
