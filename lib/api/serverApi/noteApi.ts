import { cookies } from 'next/headers';
import { nextServer } from '../api';
import { Note, NoteResponse, NotesSearchParams } from '@/types/note';
import { PER_PAGE } from '@/constants';

export async function getTagsServer() {
  const cookieStore = await cookies();
  const response = await nextServer.get<string[]>('/notes/tags', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function getNotesServer(params: NotesSearchParams = {}) {
  params.search = params?.search?.trim().toLowerCase();

  if (params.search === '') {
    delete params.search;
  }
  const cookieStore = await cookies();
  const response = await nextServer.get<NoteResponse>('/notes', {
    params: {
      ...params,
      PER_PAGE,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function getNoteByIdServer(id: string) {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}
