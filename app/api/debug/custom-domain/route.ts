import { NextResponse } from 'next/server';
import { getSubdomainFromCustomDomain } from '@/lib/subdomains';
import { redis } from '@/lib/redis';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');
  const hostname = request.headers.get('host') || '';

  try {
    // Get all custom domain mappings
    const keys = await redis.keys('customdomain:*');
    const allMappings: Record<string, string> = {};

    if (keys.length > 0) {
      const values = await redis.mget<string[]>(...keys);
      keys.forEach((key, index) => {
        const customDomain = key.replace('customdomain:', '');
        allMappings[customDomain] = values[index] || 'not found';
      });
    }

    // Check specific domain if provided
    let specificCheck = null;
    if (domain) {
      const subdomain = await getSubdomainFromCustomDomain(domain);
      specificCheck = {
        domain,
        subdomain,
        found: !!subdomain
      };
    }

    // Check current hostname
    let hostnameCheck = null;
    if (hostname) {
      const subdomain = await getSubdomainFromCustomDomain(hostname);
      hostnameCheck = {
        hostname,
        subdomain,
        found: !!subdomain
      };
    }

    return NextResponse.json({
      success: true,
      environment: process.env.NODE_ENV,
      rootDomain: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
      redisConnected: true,
      allCustomDomainMappings: allMappings,
      totalMappings: keys.length,
      specificCheck,
      hostnameCheck,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[Debug API] Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      redisConnected: false,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

