import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { Note, NoteResponse } from '@/types/note';
import {
  parseApiErrorMessage,
  parseApiErrorStatus,
} from '@/utils/parseApiError';
import { cookies } from 'next/headers';
import { ApiError } from '@/types/api';
import { getAuthCookies } from '@/utils/cookieOperations';
import { createBearerAuth } from '@/utils/createBearerAuth';

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');
  const search = request.nextUrl.searchParams.get('search');
  const cookieStore = await cookies();
  const { accessToken } = getAuthCookies(cookieStore);
  try {
    if (accessToken) {
      const { data } = await api.get<NoteResponse>('/notes', {
        params: {
          tag,
          search,
        },
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

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const cookieStore = await cookies();
  const { accessToken } = getAuthCookies(cookieStore);
  try {
    if (accessToken) {
      const { data } = await api.post<Note>('/notes', payload, {
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
