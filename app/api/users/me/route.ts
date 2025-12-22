import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { UserProfile } from '@/types/auth';
import {
  parseApiErrorMessage,
  parseApiErrorStatus,
} from '@/utils/parseApiError';
import { cookies } from 'next/headers';
import { ApiError } from '@/types/api';
import { createBearerAuth } from '@/utils/createBearerAuth';
import { getAuthCookies } from '@/utils/cookieOperations';

export async function GET() {
  const cookieStore = await cookies();
  const { accessToken } = getAuthCookies(cookieStore);
  try {
    if (accessToken) {
      const { data } = await api.get<UserProfile>('/users/me', {
        headers: {
          Authorization: createBearerAuth(accessToken),
        },
      });
      return NextResponse.json(data);
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } catch (error) {
    return NextResponse.json(
      {
        error: parseApiErrorMessage(error as ApiError),
      },
      { status: parseApiErrorStatus(error as ApiError) }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const payload = await request.json();
  const cookieStore = await cookies();
  const { accessToken } = getAuthCookies(cookieStore);
  try {
    if (accessToken) {
      const { data } = await api.patch<UserProfile>('/users/me', payload, {
        headers: {
          Authorization: createBearerAuth(accessToken),
        },
      });
      return NextResponse.json(data);
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } catch (error) {
    return NextResponse.json(
      {
        error: parseApiErrorMessage(error as ApiError),
      },
      { status: parseApiErrorStatus(error as ApiError) }
    );
  }
}
