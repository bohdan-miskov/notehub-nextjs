import { AxiosError } from 'axios';

export type User = {
  username: string;
  email: string;
};

export type UserProfile = User & {
  avatar: string;
};

export type UserData = Omit<User, 'email'>;

export type RegisterRequest = User & { password: string };

export type LoginRequest = Pick<RegisterRequest, 'email' | 'password'>;

export type ApiError = AxiosError<{ error: string }>;
