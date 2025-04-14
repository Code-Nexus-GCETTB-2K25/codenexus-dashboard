// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('auth_token')?.value;

  // If no valid token, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Apply middleware to all secured routes
export const config = {
  matcher: [
    '/activities/:path*',
    '/events/:path*',
    '/resources/:path*',
    '/team/:path*',
    '/volunteers/:path*',
    '/',  // Protect root too
  ],
};
