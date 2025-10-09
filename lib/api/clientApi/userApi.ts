import { User, UserProfile } from '@/types/auth';
import { nextServer } from '../api';

export async function getMe() {
  const response = await nextServer.get<UserProfile>('/users/me');
  return response.data;
}

export async function updateMe(payload: User) {
  const response = await nextServer.patch<UserProfile>('/users/me', payload);
  return response.data;
}
