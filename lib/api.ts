import {
  Note,
  NoteCreatePayload,
  NotesSearchParams,
  NoteUpdatePayload,
} from '@/types/note';
import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.headers.common.Authorization = `Bearer ${token}`;

const perPage = 12;

type NoteResponse = {
  notes: Note[];
  totalPages: number;
};

export async function getNotes(params: NotesSearchParams = {}) {
  if (params.search === '') {
    delete params.search;
  }

  const response = await axios.get<NoteResponse>('/notes', {
    params: {
      ...params,
      perPage,
    },
  });
  return response.data;
}

export async function getNoteById(id: string) {
  const response = await axios.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function createNote(payload: NoteCreatePayload) {
  const response = await axios.post<Note>('/notes', payload);
  return response.data;
}

export async function deleteNote(id: string) {
  await axios.delete(`/notes/${id}`);
}

export async function updateNote({
  payload,
  id,
}: {
  payload: NoteUpdatePayload;
  id: string;
}) {
  const response = await axios.patch<Note>(`/notes/${id}`, payload);
  return response.data;
}
