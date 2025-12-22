import { NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { clearAuthCookies, getAuthCookies } from '@/utils/cookieOperations';
import {
  parseApiErrorMessage,
  parseApiErrorStatus,
} from '@/utils/parseApiError';
import { ApiError } from '@/types/api';
import { createBearerAuth } from '@/utils/createBearerAuth';

export async function POST() {
  const cookieStore = await cookies();
  const { refreshToken } = getAuthCookies(cookieStore);
  try {
    if (refreshToken) {
      await api.post(
        '/auth/logout',
        {},
        {
          headers: {
            Authorization: createBearerAuth(refreshToken),
          },
        }
      );
      clearAuthCookies(cookieStore);
      return NextResponse.json({ message: 'Logged out successfully' });
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
