import { Note, Tag } from '@/types/note';
import axios from 'axios';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

axios.defaults.headers.common.Authorization =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE3NTM4NjkwMzl9.5vMyAcvA_LhTP5HyR_DNvXA_avXlfhYJBkkXVOVSXJ0';

const perPage = 12;

type SortBy = 'created' | 'updated';

type SearchParams = {
  search?: string;
  tag?: Tag;
  page?: number;
  sortBy?: SortBy;
};

type NoteResponse = {
  notes: Note[];
  totalPages: number;
};

type NotePayload = Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'userId'>;

export async function getNotes(params: SearchParams) {
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

export async function createNote(payload: NotePayload) {
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
  payload: NotePayload;
  id: string;
}) {
  const response = await axios.patch<Note>(`/notes/${id}`, payload);
  return response.data;
}
