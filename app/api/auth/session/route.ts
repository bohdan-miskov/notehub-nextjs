import { getAuthCookies, setAuthCookies } from '@/utils/cookieOperations';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { api, ApiError } from '../../api';

export async function GET() {
  const cookieStore = await cookies();
  const { accessToken, refreshToken } = getAuthCookies(cookieStore);

  if (accessToken) {
    return NextResponse.json({ success: true });
  }

  if (refreshToken) {
    try {
      const response = await api.get('auth/session', {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      const setCookie = response.headers['set-cookie'];
      if (setCookie) {
        setAuthCookies(cookieStore, setCookie);
        return NextResponse.json({ success: true });
      }

      return NextResponse.json(
        { success: false, error: 'No cookies returned from server' },
        { status: 400 }
      );
    } catch (error) {
      return NextResponse.json(
        {
          error:
            (error as ApiError).response?.data.error &&
            (error as ApiError).message,
        },
        {
          status: (error as ApiError).status,
        }
      );
    }
  }

  return NextResponse.json({ success: false });
}
