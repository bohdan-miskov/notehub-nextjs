import { PER_PAGE } from '@/constants';
import {
  Note,
  NoteCreatePayload,
  NoteResponse,
  NotesSearchParams,
  NoteUpdatePayload,
} from '@/types/note';
import { nextServer } from './api';

export async function getNotes(params: NotesSearchParams = {}) {
  params.search = params?.search?.trim().toLowerCase();

  if (params.search === '') {
    delete params.search;
  }

  const response = await nextServer.get<NoteResponse>('/notes', {
    params: {
      ...params,
      PER_PAGE,
    },
  });
  return response.data;
}

export async function getNoteById(id: string) {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function createNote(payload: NoteCreatePayload) {
  const response = await nextServer.post<Note>('/notes', payload);
  return response.data;
}

export async function deleteNote(id: string) {
  await nextServer.delete(`/notes/${id}`);
}

export async function updateNote({
  payload,
  id,
}: {
  payload: NoteUpdatePayload;
  id: string;
}) {
  const response = await nextServer.patch<Note>(`/notes/${id}`, payload);
  return response.data;
}
