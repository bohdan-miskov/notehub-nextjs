import { UserProfile } from '@/types/auth';
import { cookies } from 'next/headers';
import { nestServer } from '../api';
import { getAuthCookies } from '@/utils/cookieOperations';
import { createBearerAuth } from '@/utils/createBearerAuth';

export const getMeServer = async () => {
  const cookieStore = await cookies();
  const { accessToken } = getAuthCookies(cookieStore);

  const { data } = await nestServer.get<UserProfile>('/users/me', {
    headers: {
      Authorization: createBearerAuth(accessToken ?? ''),
    },
  });
  return data;
};
