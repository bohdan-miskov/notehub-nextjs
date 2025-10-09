'use client';

import { checkSession } from '@/lib/api/clientApi/authApi';
import { getMe } from '@/lib/api/clientApi/userApi';
import { useAuthStore } from '@/lib/stores/authStore';
import { ReactNode, useEffect } from 'react';

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated
  );

  useEffect(() => {
    async function fetchUser() {
      const isAuthenticated = await checkSession();

      if (isAuthenticated) {
        const user = await getMe();
        if (user) setUser(user);
      } else {
        clearIsAuthenticated();
      }
    }

    fetchUser();
  }, [clearIsAuthenticated, setUser]);

  return children;
}
