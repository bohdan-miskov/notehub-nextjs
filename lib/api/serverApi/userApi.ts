import { User } from '@/types/auth';
import { cookies } from 'next/headers';
import { nextServer } from '../api';

export const getServerMe = async () => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>('/auth/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
