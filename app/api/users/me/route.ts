import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { ApiError, UserProfile } from '@/types/auth';
import {
  parseApiErrorMessage,
  parseApiErrorStatus,
} from '@/utils/parseApiError';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  try {
    const { data } = await api.get<UserProfile>('/users/me', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(data);
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
  const payload = request.json();
  const cookieStore = await cookies();
  try {
    const { data } = await api.patch<UserProfile>('/users/me', payload, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: parseApiErrorMessage(error as ApiError),
      },
      { status: parseApiErrorStatus(error as ApiError) }
    );
  }
}
