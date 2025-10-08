import { NextRequest, NextResponse } from 'next/server';
import { api, ApiError } from '../api';
import { Note, NoteResponse } from '@/types/note';

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
        error:
          (error as ApiError).response?.data?.error ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).status }
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
        error:
          (error as ApiError).response?.data.error ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).status }
    );
  }
}
