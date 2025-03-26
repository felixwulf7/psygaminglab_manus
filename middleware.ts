import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the request is for a generated game file
  if (pathname.startsWith('/games/') && pathname.endsWith('.html')) {
    const filename = pathname.split('/').pop();
    
    if (filename) {
      // Rewrite to the API endpoint that will serve the file
      return NextResponse.rewrite(new URL(`/api/games/${filename}`, request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/games/:path*'],
}; 