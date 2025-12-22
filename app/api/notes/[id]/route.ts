import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { Note } from '@/types/note';
import { ApiError } from '@/types/api';
import {
  parseApiErrorMessage,
  parseApiErrorStatus,
} from '@/utils/parseApiError';
import { cookies } from 'next/headers';
import { getAuthCookies } from '@/utils/cookieOperations';
import { createBearerAuth } from '@/utils/createBearerAuth';

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  const { accessToken } = getAuthCookies(cookieStore);
  try {
    if (accessToken) {
      const { data } = await api.get<Note>(`/notes/${id}`, {
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

export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  const { accessToken } = getAuthCookies(cookieStore);
  try {
    if (accessToken) {
      await api.delete(`/notes/${id}`, {
        headers: {
          Authorization: createBearerAuth(accessToken),
        },
      });
      return NextResponse.json({ message: 'Delete successfully' });
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
  const { accessToken } = getAuthCookies(cookieStore);
  try {
    if (accessToken) {
      const { data } = await api.patch<Note>(`/notes/${id}`, payload, {
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
      {
        status: parseApiErrorStatus(error as ApiError),
      }
    );
  }
}
