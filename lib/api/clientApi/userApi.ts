import { UserProfile } from '@/types/auth';
import { nextServer } from '../api';

export async function getMe() {
  const response = await nextServer.get<UserProfile>('/users/me');
  return response.data;
}

export async function updateMe(payload: FormData) {
  const response = await nextServer.patch<UserProfile>('/users/me', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}
