'use client';

import { logout } from '@/lib/api/clientApi/authApi';
import { useAuthStore } from '@/lib/stores/authStore';
import css from './AuthNavigation.module.css';
import { ActiveLink } from '../ActiveLink/ActiveLink';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

type Props = {
  activeClassName?: string;
};

export default function AuthNavigation({ activeClassName }: Props) {
  const { isAuthenticated, clearIsAuthenticated } = useAuthStore();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    clearIsAuthenticated();
    router.push('/');
  }

  return isAuthenticated ? (
    <>
      <li>
        <ActiveLink
          href="/profile"
          className={css.authLink}
          activeClassName={clsx(activeClassName, css.activeLink)}
        >
          Profile
        </ActiveLink>
      </li>
      <li>
        {/* <p>{user?.username}</p> */}
        <button className={css.logout} onClick={handleLogout}>
          Logout
        </button>
      </li>
    </>
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
