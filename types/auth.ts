export type User = {
  name: string;
  email: string;
};

export type UserProfile = User & {
  avatar: string;
};

export type UserData = Omit<User, 'email'>;

export type RegisterRequest = User & { password: string };

export type LoginRequest = Pick<RegisterRequest, 'email' | 'password'>;

export type CookiesResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
};
