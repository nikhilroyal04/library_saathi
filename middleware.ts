import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';
  
  // Get root domain from environment or default
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';
  
  // Skip middleware for static files, API routes, and Next.js internals
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/favicon.ico') ||
    url.pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp)$/)
  ) {
    return NextResponse.next();
  }
  
  // Check if this is a subdomain request
  const isLocalhost = hostname.includes('localhost');
  const parts = hostname.split('.');
  
  // Extract subdomain
  let subdomain: string | null = null;
  
  if (isLocalhost) {
    // For localhost: subdomain.localhost:3000
    // parts = ['subdomain', 'localhost:3000']
    if (parts.length > 1 && parts[0] !== 'localhost' && parts[0] !== 'www' && parts[0] !== rootDomain.split(':')[0]) {
      subdomain = parts[0];
    }
  } else {
    // For production: subdomain.example.com
    // parts = ['subdomain', 'example', 'com']
    const rootParts = rootDomain.split('.');
    if (parts.length > rootParts.length && parts[0] !== 'www') {
      subdomain = parts[0];
    }
  }
  
  // If we have a subdomain and it's not already going to /s/ route or dashboard/login
  if (
    subdomain && 
    !url.pathname.startsWith('/s/') && 
    !url.pathname.startsWith('/dashboard') &&
    !url.pathname.startsWith('/login')
  ) {
    // Rewrite to subdomain route
    const path = url.pathname === '/' ? '' : url.pathname;
    url.pathname = `/s/${subdomain}${path}`;
    return NextResponse.rewrite(url);
  }
  
  // If it's the root domain, let it pass through normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

