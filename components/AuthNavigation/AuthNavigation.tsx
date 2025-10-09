'use client';

import { logout } from '@/lib/api/clientApi/authApi';
import { useAuthStore } from '@/lib/stores/authStore';
import css from './AuthNavigation.module.css';
import { ActiveLink } from '../ActiveLink/ActiveLink';
import clsx from 'clsx';

type Props = {
  activeClassName?: string;
};

export default function AuthNavigation({ activeClassName }: Props) {
  const { isAuthenticated, user } = useAuthStore();

  async function handleLogout() {
    await logout();
  }

  return isAuthenticated ? (
    <li>
      <p>{user?.username}</p>
      <button className={css.logout} onClick={handleLogout}>
        Logout
      </button>
    </li>
  ) : (
    <>
      <li>
        <ActiveLink
          href="/sign-in"
          className={css.authLink}
          activeClassName={clsx(activeClassName, css.activeLink)}
        >
          Login
        </ActiveLink>
      </li>
      <li>
        <ActiveLink
          href="/sign-up"
          className={css.authLink}
          activeClassName={clsx(activeClassName, css.activeLink)}
        >
          Register
        </ActiveLink>
      </li>
    </>
  );
}
