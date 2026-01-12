import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthCookies, setAuthCookies } from './utils/cookieOperations';
import { refreshTokens } from './lib/api/serverApi/authApi';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './constants';

const privateRoutes = ['/profile', '/notes'];
const authRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/api/notes/tags') ||
    pathname.includes('_next') ||
    pathname.includes('favicon.ico')
  ) {
    return NextResponse.next();
  }

  const cookieStore = await cookies();
  const { accessToken, refreshToken } = getAuthCookies(cookieStore);

  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (!accessToken && refreshToken) {
    const refreshResponse = await refreshTokens();

    if (refreshResponse && refreshResponse.data) {
      const cookiesData = refreshResponse.data;

      setAuthCookies(cookieStore, cookiesData);

      const response = isAuthRoute
        ? NextResponse.redirect(new URL('/', request.url))
        : NextResponse.next();

      response.cookies.set(ACCESS_TOKEN_KEY, cookiesData.accessToken, {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: cookiesData.expiresIn,
      });

      response.cookies.set(REFRESH_TOKEN_KEY, cookiesData.refreshToken, {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: cookiesData.refreshExpiresIn,
      });

      response.headers.set('Cookie', cookieStore.toString());

      return response;
    }
  }

  if (accessToken) {
    if (isAuthRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  if (isPrivateRoute) {
    const url = new URL('/sign-in', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
