import { User } from '@/types/auth';
import { create } from 'zustand';

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  // setUserData: (user: UserData) => void;
  clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthStore>()(set => ({
  isAuthenticated: false,
  user: null,
  setUser: user => set({ user, isAuthenticated: true }),
  // setUserData: userData => set({ user: { ...user, ...userData } }),
  clearIsAuthenticated: () => set({ user: null, isAuthenticated: false }),
}));
