import { shouldRedirectToLogin } from '@/lib/routeGuard';
import { NextResponse, type NextRequest } from 'next/server';

export const middleware = (request: NextRequest): NextResponse => {
  const sessionCookie = request.cookies.get('anglercast_session');
  const hasSessionCookie = Boolean(sessionCookie?.value);
  const pathname = request.nextUrl.pathname;

  if (shouldRedirectToLogin(pathname, hasSessionCookie)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
