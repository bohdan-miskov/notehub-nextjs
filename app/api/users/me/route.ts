import { NextResponse } from 'next/server';
import { api, ApiError } from '../../api';
import { UserProfile } from '@/types/auth';

export async function GET() {
  try {
    const { data } = await api.get<UserProfile>('/auth/users');
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data?.error ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).status }
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
        error:
          (error as ApiError).response?.data?.error ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).status }
    );
  }
}
