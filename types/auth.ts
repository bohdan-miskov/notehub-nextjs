export type User = {
  username: string;
  email: string;
};

export type UserProfile = {
  name: string;
  email: string;
  avatar: string;
};

export type RegisterRequest = User & { password: string };

export type LoginRequest = Pick<RegisterRequest, 'email' | 'password'>;
