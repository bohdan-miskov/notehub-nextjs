import { LoginRequest, RegisterRequest, User } from '@/types/auth';
import { nextServer } from '../api';

export async function register(payload: RegisterRequest) {
  const response = await nextServer.post<User>('/auth/register', {
    email: payload.email,
    password: payload.password,
  });
  return response.data;
}

export async function login(payload: LoginRequest) {
  const response = await nextServer.post<User>('/auth/login', payload);
  return response.data;
}

export async function logout() {
  await nextServer.post('/auth/logout');
}

type CheckSessionResponse = {
  success: boolean;
};

export async function checkSession() {
  const response = await nextServer.get<CheckSessionResponse>('/auth/session');
  return response.data.success;
}
