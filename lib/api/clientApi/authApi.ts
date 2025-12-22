import { LoginRequest, RegisterRequest, User } from '@/types/auth';
import { nextServer } from '../api';

export async function register(payload: RegisterRequest) {
  const response = await nextServer.post<User>('/auth/register', {
    name: payload.name,
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

export async function refreshTokens() {
  const response = await nextServer.post<CheckSessionResponse>('/auth/refresh');
  return response.data.success;
}
