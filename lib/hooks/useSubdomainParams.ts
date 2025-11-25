'use client';

import { use } from 'react';

interface SubdomainParams {
  subdomain: string;
}

/**
 * Hook to unwrap Next.js 16 params Promise
 * Use this in all client components that need subdomain params
 */
export function useSubdomainParams(params: Promise<SubdomainParams> | SubdomainParams): SubdomainParams {
  // If params is already unwrapped (not a Promise), return it directly
  if ('subdomain' in params && typeof params.subdomain === 'string') {
    return params as SubdomainParams;
  }
  
  // If params is a Promise, unwrap it using React.use()
  return use(params as Promise<SubdomainParams>);
}

