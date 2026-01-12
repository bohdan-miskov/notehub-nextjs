import { LoginRequest, RegisterRequest } from '@/types/auth';
import { nextServer } from '../api';

export async function register(payload: RegisterRequest) {
  await nextServer.post('/auth/register', {
    name: payload.name,
    email: payload.email,
    password: payload.password,
  });
  return;
}

export async function login(payload: LoginRequest) {
  await nextServer.post('/auth/login', payload);
  return;
}

export async function getGoogleOAuth() {
  const response = await nextServer.get('/auth/get-google-oauth');
  return response.data.url;
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
