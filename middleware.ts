import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  getAuthCookies,
  setAuthCookiesFromHeaders,
} from './utils/cookieOperations';
import { refreshTokens } from './lib/api/serverApi/authApi';

const privateRoutes = ['/profile', '/notes'];
const authRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();

  const { accessToken, refreshToken } = getAuthCookies(cookieStore);

  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/api/auth') ||
    pathname.includes('_next') ||
    pathname.includes('favicon.ico')
  ) {
    return NextResponse.next();
  }

  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );
  if (!accessToken) {
    if (refreshToken) {
      const refreshResponse = await refreshTokens();

      const setCookieHeader =
        refreshResponse.headers &&
        typeof refreshResponse.headers.get === 'function'
          ? refreshResponse.headers.get('set-cookie')
          : null;

      if (setCookieHeader) {
        setAuthCookiesFromHeaders(
          cookieStore,
          refreshResponse.headers['set-cookie']
        );

        const response = isAuthRoute
          ? NextResponse.redirect(new URL('/', request.url))
          : NextResponse.next();

        response.headers.set('set-cookie', setCookieHeader.toString());
        response.headers.set('Cookie', cookieStore.toString());

        return response;
      }
    }

    if (isAuthRoute) {
      return NextResponse.next();
    }

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  if (isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isPrivateRoute) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/profile/:path*', '/sign-in', '/sign-up', '/notes/:path*'],
};
