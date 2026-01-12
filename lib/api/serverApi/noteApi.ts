import { cookies } from 'next/headers';
import { nestServer } from '../api';
import { Note, NoteResponse, NotesSearchParams } from '@/types/note';
import { PER_PAGE } from '@/constants';
import { createBearerAuth } from '@/utils/createBearerAuth';
import { getAuthCookies } from '@/utils/cookieOperations';

export async function getTagsServer() {
  const response = await nestServer.get<string[]>('/notes/tags');
  return response.data;
}

export async function getNotesServer(params: NotesSearchParams = {}) {
  params.search = params?.search?.trim().toLowerCase();

  if (params.search === '') {
    delete params.search;
  }
  const cookieStore = await cookies();
  const { accessToken } = getAuthCookies(cookieStore);

  const response = await nestServer.get<NoteResponse>('/notes', {
    params: {
      ...params,
      PER_PAGE,
    },
    headers: {
      Authorization: createBearerAuth(accessToken ?? ''),
    },
  });
  return response.data;
}

export async function getNoteByIdServer(id: string) {
  const cookieStore = await cookies();
  const { accessToken } = getAuthCookies(cookieStore);
  const response = await nestServer.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: createBearerAuth(accessToken ?? ''),
    },
  });
  return response.data;
}
