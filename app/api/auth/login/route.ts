import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { setAuthCookies } from '@/utils/cookieOperations';
import { cookies } from 'next/headers';
import {
  parseApiErrorMessage,
  parseApiErrorStatus,
} from '@/utils/parseApiError';
import { ApiError } from '@/types/auth';

export async function POST(request: NextRequest) {
  const payload = await request.json();

  try {
    const response = await api.post('/auth/login', payload);
    const cookieStore = await cookies();
    const setCookie = response.headers['set-cookie'];

    if (setCookie) {
      await setAuthCookies(cookieStore, setCookie);

      return NextResponse.json(response.data);
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
