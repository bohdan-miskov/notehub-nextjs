import { NextResponse } from 'next/server';
import { api, ApiError } from '../../api';
import { cookies } from 'next/headers';
import { clearAuthCookies } from '@/utils/cookieOperations';

export async function POST() {
  const cookieStore = await cookies();
  try {
    await api.post('auth/logout', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    clearAuthCookies(cookieStore);
    return NextResponse.json({ message: 'Logged out successfully' });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data.error &&
          (error as ApiError).message,
      },
      {
        status: (error as ApiError).status,
      }
    );
  }
}
