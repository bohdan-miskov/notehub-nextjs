import { NextRequest, NextResponse } from 'next/server';
import { api, ApiError } from '../../api';
import { setAuthCookies } from '@/utils/cookieOperations';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const payload = request.json();

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
