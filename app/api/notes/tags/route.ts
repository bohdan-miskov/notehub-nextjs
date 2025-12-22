import { NextResponse } from 'next/server';
import { api } from '../../api';
import {
  parseApiErrorMessage,
  parseApiErrorStatus,
} from '@/utils/parseApiError';
import { ApiError } from '@/types/api';

export async function GET() {
  try {
    const { data } = await api.get<string[]>('/notes/tags');
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
