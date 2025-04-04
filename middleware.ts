import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// Array of protected routes
const protectedRoutes = [
  '/dashboard',
  '/books/create',
  '/books/edit',
  '/authors/create',
  '/authors/edit',
  '/genres/create',
  '/genres/edit',
];

interface MiddlewareRequest extends NextRequest {
    cookies: NextRequest['cookies'];
}

export function middleware(request: MiddlewareRequest): NextResponse {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;
    
    // Check if the path is a protected route
    const isProtectedRoute = protectedRoutes.some((route: string) => 
        pathname.startsWith(route)
    );
    
    // Redirect to login if trying to access protected route without token
    if (isProtectedRoute && !token) {
        const url = new URL('/login', request.url);
        url.searchParams.set('from', pathname);
        return NextResponse.redirect(url);
    }
    
    // Redirect to dashboard if trying to access login/register while logged in
    if ((pathname === '/login' || pathname === '/register') && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/books/create/:path*',
    '/books/edit/:path*',
    '/authors/create/:path*',
    '/authors/edit/:path*',
    '/genres/create/:path*',
    '/genres/edit/:path*',
    '/login',
    '/register',
  ],
};