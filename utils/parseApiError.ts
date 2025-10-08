import { ApiError } from '@/types/auth';

export function parseApiErrorMessage(error: ApiError) {
  return error.response?.data?.error ?? error.message ?? 'Oops... some error';
}

export function parseApiErrorStatus(error: ApiError) {
  return error.status;
}
