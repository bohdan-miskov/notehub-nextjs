import { cookies } from 'next/headers';
import { nextServer } from '../api';
import { Note } from '@/types/note';

export async function getNoteByIdServer(id: string) {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}
