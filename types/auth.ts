export type User = {
  name: string;
  email: string;
  avatar?: string | null;
};

export type UserProfile = User & {
  avatar: string;
};

export type UserUpdateData = Omit<User, 'email' | 'avatar'> & {
  avatar: File | null;
};

export type RegisterRequest = User & { password: string };

export type LoginRequest = Pick<RegisterRequest, 'email' | 'password'>;

export type CookiesResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
};
