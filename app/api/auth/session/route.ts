import { getAuthCookies, setAuthCookies } from '@/utils/cookieOperations';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { api } from '../../api';
import {
  parseApiErrorMessage,
  parseApiErrorStatus,
} from '@/utils/parseApiError';
import { ApiError } from '@/types/auth';

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
          error: parseApiErrorMessage(error as ApiError),
        },
        {
          status: parseApiErrorStatus(error as ApiError),
        }
      );
    }
  }

  return NextResponse.json({ success: false });
}
