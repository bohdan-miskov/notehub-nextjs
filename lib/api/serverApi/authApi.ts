import { cookies } from 'next/headers';
import axios from 'axios'; // Використовуйте чистий axios або fetch, щоб уникнути проблем з interceptors
import { CookiesResponse } from '@/types/auth';
import { getAuthCookies } from '@/utils/cookieOperations';
import { createBearerAuth } from '@/utils/createBearerAuth';

export const refreshTokens = async () => {
  const cookieStore = await cookies();
  const { refreshToken } = getAuthCookies(cookieStore);

  if (!refreshToken) return null;

  try {
    const backendUrl = process.env.NEXT_API_URL;

    const res = await axios.post<CookiesResponse>(
      `${backendUrl}/auth/refresh`,
      {},
      {
        headers: {
          Authorization: createBearerAuth(refreshToken),
        },
      }
    );

    return res;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status !== 403 && error.response?.status !== 401) {
        console.error('Refresh token error:', error.message);
      }
    }
    return null;
  }
};
