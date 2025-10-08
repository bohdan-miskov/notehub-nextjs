import { NextRequest, NextResponse } from 'next/server';
import { api, ApiError } from '../../api';
import { Note } from '@/types/note';

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params;
  try {
    const { data } = await api.get<Note>(`/notes/${id}`);
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

export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;

  try {
    await api.delete(`/notes/${id}`);
    NextResponse.json({ message: 'Delete successfully' });
  } catch (error) {
    NextResponse.json(
      {
        error:
          (error as ApiError).response?.data.error ??
          (error as ApiError).message,
      },
      {
        status: (error as ApiError).status,
      }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const payload = request.json();

  try {
    const { data } = await api.patch<Note>(`/note/${id}`, payload);
    NextResponse.json(data);
  } catch (error) {
    NextResponse.json(
      {
        error:
          (error as ApiError).response?.data.error ??
          (error as ApiError).message,
      },
      {
        status: (error as ApiError).status,
      }
    );
  }
}
