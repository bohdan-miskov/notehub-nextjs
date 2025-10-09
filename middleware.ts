// middleware.ts
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthCookies, setAuthCookies } from './utils/cookieOperations';
import { checkServerSession } from './lib/api/serverApi/authApi';

const privateRoutes = ['/profile'];
const authRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const { accessToken, refreshToken } = getAuthCookies(cookieStore);

  const { pathname } = request.nextUrl;

  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (isPrivateRoute) {
    if (!accessToken) {
      if (refreshToken) {
        const data = await checkServerSession();
        const setCookie = data.headers['set-cookie'];

        if (setCookie) {
          setAuthCookies(cookieStore, setCookie);

          if (isAuthRoute) {
            return NextResponse.redirect(new URL('/', request.url), {
              headers: {
                Cookie: cookieStore.toString(),
              },
            });
          }
          if (isPrivateRoute) {
            return NextResponse.next({
              headers: {
                Cookie: cookieStore.toString(),
              },
            });
          }
        }
      }

      if (isAuthRoute) {
        return NextResponse.next();
      }

      if (isPrivateRoute) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
      }
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
  matcher: ['/profile/:path*', '/sign-in', '/sign-up'],
};
