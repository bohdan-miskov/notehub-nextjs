import { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error: string }>;

export type ErrorResponse = {
  status: number;
  message: string;
};
