import { NextResponse } from 'next/server';
import { api } from '../../api';
import { ApiError, UserProfile } from '@/types/auth';
import {
  parseApiErrorMessage,
  parseApiErrorStatus,
} from '@/utils/parseApiError';

export async function GET() {
  try {
    const { data } = await api.get<UserProfile>('/auth/users');
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

export async function PATCH() {
  try {
    const { data } = await api.patch<UserProfile>('/auth/users');
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
