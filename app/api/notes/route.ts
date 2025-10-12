import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { Note, NoteResponse } from '@/types/note';
import {
  parseApiErrorMessage,
  parseApiErrorStatus,
} from '@/utils/parseApiError';
import { cookies } from 'next/headers';
import { ApiError } from '@/types/api';

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');
  const search = request.nextUrl.searchParams.get('search');
  const cookieStore = await cookies();
  try {
    const { data } = await api.get<NoteResponse>('/notes', {
      params: {
        tag,
        search,
      },
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

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const cookieStore = await cookies();
  try {
    const { data } = await api.post<Note>('/notes', payload, {
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
