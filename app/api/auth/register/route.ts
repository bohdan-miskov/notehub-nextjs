import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { setAuthCookies } from '@/utils/cookieOperations';
import { cookies } from 'next/headers';
import { ApiError } from '@/types/api';
import {
  parseApiErrorMessage,
  parseApiErrorStatus,
} from '@/utils/parseApiError';
import { CookiesResponse } from '@/types/auth';

export async function POST(request: NextRequest) {
  const payload = await request.json();

  try {
    const response = await api.post<CookiesResponse>('/auth/register', payload);
    const cookieStore = await cookies();
    const cookiesData = response.data;
    if (cookiesData) {
      setAuthCookies(cookieStore, cookiesData);
      return NextResponse.json({});
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
