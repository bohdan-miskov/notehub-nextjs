import { NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { clearAuthCookies } from '@/utils/cookieOperations';
import {
  parseApiErrorMessage,
  parseApiErrorStatus,
} from '@/utils/parseApiError';
import { ApiError } from '@/types/auth';

export async function POST() {
  const cookieStore = await cookies();
  try {
    await api.post(
      '/auth/logout',
      {},
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    );
    clearAuthCookies(cookieStore);
    return NextResponse.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log('🚀 ~ POST ~ error:', error);
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
