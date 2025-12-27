import { NextRequest, NextResponse } from 'next/server';
import { setAuthCookies } from '@/utils/cookieOperations';
import { cookies } from 'next/headers';
import {
  parseApiErrorMessage,
  parseApiErrorStatus,
} from '@/utils/parseApiError';
import { ApiError } from '@/types/api';

export async function GET(request: NextRequest) {
  const url = new URL(request.url).searchParams;
  const tokens = {
    accessToken: url.get('accessToken') as string,
    expiresIn: Number(url.get('expiresIn')),
    refreshToken: url.get('refreshToken') as string,
    refreshExpiresIn: Number(url.get('refreshExpiresIn')),
  };

  try {
    const cookieStore = await cookies();
    setAuthCookies(cookieStore, tokens);
    return NextResponse.redirect(new URL('/', request.url));
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
