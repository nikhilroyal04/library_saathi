import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSubdomainFromCustomDomain } from '@/lib/subdomains';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';
  
  // Get root domain from environment or default
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';
  
  // Debug logging (remove in production if needed)
  if (process.env.NODE_ENV === 'development') {
    console.log('[Middleware] Hostname:', hostname);
    console.log('[Middleware] Root Domain:', rootDomain);
    console.log('[Middleware] Pathname:', url.pathname);
  }
  
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
  const isVercel = hostname.includes('vercel.app');
  
  // Clean hostname and root domain for comparison
  const cleanHostname = hostname.split(':')[0].toLowerCase();
  const cleanRootDomain = rootDomain.split(':')[0].toLowerCase();
  
  let subdomain: string | null = null;
  
  // First, check if this is a custom domain (different from root domain)
  // Custom domain check should happen BEFORE normal subdomain detection
  if (!cleanHostname.includes(cleanRootDomain) && cleanHostname !== cleanRootDomain) {
    // This might be a custom domain - check in Redis
    try {
      const customDomainSubdomain = await getSubdomainFromCustomDomain(cleanHostname);
      if (customDomainSubdomain) {
        subdomain = customDomainSubdomain;
        
        if (process.env.NODE_ENV === 'development') {
          console.log('[Middleware] Custom domain detected:', cleanHostname, '->', subdomain);
        }
      }
    } catch (error) {
      console.error('[Middleware] Error checking custom domain:', error);
    }
  }
  
  // If not a custom domain, extract subdomain normally
  if (!subdomain) {
    if (isLocalhost) {
    // For localhost: subdomain.localhost:3000
    const parts = hostname.split('.');
    if (parts.length > 1 && parts[0] !== 'localhost' && parts[0] !== 'www' && parts[0] !== rootDomain.split(':')[0]) {
      subdomain = parts[0];
    }
  } else if (isVercel) {
    // For Vercel with custom domain: subdomain.yourdomain.com
    // For Vercel preview: subdomain-yourproject.vercel.app
    const parts = hostname.split('.');
    
    // Check if it's a custom domain (has your root domain)
    const cleanRootDomain = rootDomain.split(':')[0];
    if (hostname.includes(cleanRootDomain) && !hostname.includes('vercel.app')) {
      // Custom domain on Vercel - use normal subdomain detection
      const cleanHostname = hostname.split(':')[0];
      const hostParts = cleanHostname.split('.');
      const rootParts = cleanRootDomain.split('.');
      
      if (hostParts.length > rootParts.length) {
        const potentialSubdomain = hostParts[0];
        const hostWithoutSubdomain = hostParts.slice(1).join('.');
        if (hostWithoutSubdomain === cleanRootDomain && potentialSubdomain !== 'www') {
          subdomain = potentialSubdomain;
        }
      }
    } else {
      // Vercel preview URL: test1-yourproject.vercel.app
      // Extract subdomain from first part before dash
      if (parts.length >= 2) {
        const firstPart = parts[0];
        if (firstPart.includes('-')) {
          const subdomainPart = firstPart.split('-')[0];
          if (subdomainPart && subdomainPart !== 'www' && subdomainPart.length > 0) {
            subdomain = subdomainPart;
          }
        }
      }
    }
  } else {
    // For production: subdomain.example.com
    // Remove port if present (e.g., example.com:3000 -> example.com)
    const cleanHostname = hostname.split(':')[0];
    const cleanRootDomain = rootDomain.split(':')[0];
    
    // Split by dots
    const hostParts = cleanHostname.split('.');
    const rootParts = cleanRootDomain.split('.');
    
    // Check if hostname has more parts than root domain (indicating a subdomain)
    if (hostParts.length > rootParts.length) {
      const potentialSubdomain = hostParts[0];
      // Verify it's actually a subdomain by checking if the rest matches root domain
      const hostWithoutSubdomain = hostParts.slice(1).join('.');
      if (hostWithoutSubdomain === cleanRootDomain && potentialSubdomain !== 'www') {
        subdomain = potentialSubdomain;
      }
    } else if (hostParts.length === rootParts.length) {
      // Handle www subdomain - treat as root domain
      if (hostParts[0] === 'www' && hostParts.slice(1).join('.') === rootParts.join('.')) {
        subdomain = null; // www is treated as root
      }
    }
    }
  }
  
  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log('[Middleware] Detected Subdomain:', subdomain);
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
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[Middleware] Rewriting to:', url.pathname);
    }
    
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

