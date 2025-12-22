import { cookies } from 'next/headers';
import { nextServer } from '../api';
import { CookiesResponse } from '@/types/auth';

export const refreshTokens = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.post<CookiesResponse>(
    '/auth/refresh',
    {},
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    }
  );
  return res;
};
