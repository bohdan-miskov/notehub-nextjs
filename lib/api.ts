import { TAG } from '@/constants';
import { Note, NoteCreatePayload, NoteUpdatePayload } from '@/types/note';
import axios from 'axios';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

const token = process.env.API_TOKEN;

axios.defaults.headers.common.Authorization = `Bearer ${token}`;

const perPage = 12;

type SortBy = 'created' | 'updated';

type SearchParams = {
  search: string;
  tag?: TAG;
  page?: number;
  sortBy?: SortBy;
};

type NoteResponse = {
  notes: Note[];
  totalPages: number;
};

export async function getNotes(params: SearchParams = { search: '' }) {
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
