import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { Note } from '@/types/note';
import { ApiError } from '@/types/auth';
import {
  parseApiErrorMessage,
  parseApiErrorStatus,
} from '@/utils/parseApiError';
import { cookies } from 'next/headers';

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  try {
    const { data } = await api.get<Note>(`/notes/${id}`, {
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

export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  try {
    await api.delete(`/notes/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json({ message: 'Delete successfully' });
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

export async function PATCH(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const payload = await request.json();
  const cookieStore = await cookies();
  try {
    const { data } = await api.patch<Note>(`/notes/${id}`, payload, {
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
      {
        status: parseApiErrorStatus(error as ApiError),
      }
    );
  }
}
