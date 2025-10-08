import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { Note, NoteResponse } from '@/types/note';
import { ApiError } from '@/types/auth';
import {
  parseApiErrorMessage,
  parseApiErrorStatus,
} from '@/utils/parseApiError';

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');
  const search = request.nextUrl.searchParams.get('search');

  try {
    const { data } = await api.get<NoteResponse>('/notes', {
      params: {
        tag,
        search,
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
  const payload = request.json();

  try {
    const { data } = await api.post<Note>('/notes', payload);
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
