import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants';
import { CookiesResponse } from '@/types/auth';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { parse } from 'cookie';

export function setAuthCookies(
  cookieStore: ReadonlyRequestCookies,
  cookies: CookiesResponse
) {
  setCookie(cookieStore, {
    name: ACCESS_TOKEN_KEY,
    value: cookies.accessToken,
    maxAge: cookies.expiresIn,
  });

  setCookie(cookieStore, {
    name: REFRESH_TOKEN_KEY,
    value: cookies.refreshToken,
    maxAge: cookies.refreshExpiresIn,
  });
}

function setCookie(
  cookieStore: ReadonlyRequestCookies,
  data: {
    name: string;
    value: string;
    maxAge: number;
    options?: Partial<ResponseCookie>;
  }
) {
  const baseOptions: Partial<ResponseCookie> = {
    httpOnly: true,
    secure: false,
    maxAge: data.maxAge,
    path: '/',
    sameSite: 'lax',
  };

  cookieStore.set(data.name, data.value, { ...baseOptions, ...data?.options });
}

type SetCookieHeader = string | string[] | undefined;

export function setAuthCookiesFromHeaders(
  cookieStore: ReadonlyRequestCookies,
  setCookie: SetCookieHeader
) {
  const cookieArray = Array.isArray(setCookie)
    ? setCookie
    : setCookie
      ? [setCookie]
      : [];

  for (const cookieStr of cookieArray) {
    console.log('🚀 ~ setAuthCookiesFromHeaders ~ cookieStr:', cookieStr);
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
  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_KEY)?.value;
  return { accessToken, refreshToken };
}

export function clearAuthCookies(cookieStore: ReadonlyRequestCookies) {
  cookieStore.delete(ACCESS_TOKEN_KEY);
  cookieStore.delete(REFRESH_TOKEN_KEY);
}
