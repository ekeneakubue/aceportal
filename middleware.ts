import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware protects admin routes
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the request is for an admin route
  if (pathname.startsWith('/admin')) {
    // TODO: Implement actual authentication check
    // For now, we'll allow access to admin routes
    // In production, you should:
    // 1. Check for a valid session token
    // 2. Verify the user has SUPER_ADMIN role
    // 3. Redirect to login if not authenticated
    
    // Example authentication check (to be implemented):
    // const token = request.cookies.get('auth-token');
    // if (!token) {
    //   return NextResponse.redirect(new URL('/login', request.url));
    // }
    
    // const user = await verifyToken(token);
    // if (user.role !== 'SUPER_ADMIN') {
    //   return NextResponse.redirect(new URL('/unauthorized', request.url));
    // }
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/admin/:path*',
  ],
};

