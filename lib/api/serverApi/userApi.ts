import { UserProfile } from '@/types/auth';
import { cookies } from 'next/headers';
import { nextServer } from '../api';

export const getServerMe = async () => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<UserProfile>('/auth/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
