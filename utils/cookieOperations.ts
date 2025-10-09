import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants';
import { parse } from 'cookie';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

type SetCookieHeader = string | string[] | undefined;

export function setAuthCookies(
  cookieStore: ReadonlyRequestCookies,
  setCookie: SetCookieHeader
) {
  const cookieArray = Array.isArray(setCookie)
    ? setCookie
    : setCookie
      ? [setCookie]
      : [];

  for (const cookieStr of cookieArray) {
    const parsed = parse(cookieStr);
    // Створюємо налаштування для cookies
    const options = {
      expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
      path: parsed.Path,
      maxAge: Number(parsed['Max-Age']),
    };

    // Методом cookieStore.set додаємо кукі до нашого запиту
    if (parsed.accessToken) {
      // cookieStore.set('імʼя ключа',  'значення токену',  додаткові налаштування)
      cookieStore.set(ACCESS_TOKEN_KEY, parsed.accessToken, options);
    }
    if (parsed.refreshToken) {
      cookieStore.set(REFRESH_TOKEN_KEY, parsed.refreshToken, options);
    }
  }
}

export function getAuthCookies(cookieStore: ReadonlyRequestCookies) {
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  return { accessToken, refreshToken };
}

export function clearAuthCookies(cookieStore: ReadonlyRequestCookies) {
  cookieStore.delete(ACCESS_TOKEN_KEY);
  cookieStore.delete(REFRESH_TOKEN_KEY);
}
