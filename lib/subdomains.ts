import { redis } from '@/lib/redis';

export function isValidIcon(str: string) {
  if (str.length > 10) {
    return false;
  }

  try {
    // Primary validation: Check if the string contains at least one emoji character
    // This regex pattern matches most emoji Unicode ranges
    const emojiPattern = /[\p{Emoji}]/u;
    if (emojiPattern.test(str)) {
      return true;
    }
  } catch (error) {
    // If the regex fails (e.g., in environments that don't support Unicode property escapes),
    // fall back to a simpler validation
    console.warn(
      'Emoji regex validation failed, using fallback validation',
      error
    );
  }

  // Fallback validation: Check if the string is within a reasonable length
  // This is less secure but better than no validation
  return str.length >= 1 && str.length <= 10;
}

type SubdomainData = {
  emoji: string;
  createdAt: number;
  ownerEmail?: string;
  ownerSubdomain?: string;
};

export type LibraryDetails = {
  name?: string;
  description?: string;
  logo?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  timings?: string;
  customDomain?: string; // Custom domain like library.example.com
};

export async function getSubdomainData(subdomain: string) {
  const sanitizedSubdomain = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
  const data = await redis.get<SubdomainData>(
    `subdomain:${sanitizedSubdomain}`
  );
  return data;
}

export async function getLibraryDetails(subdomain: string): Promise<LibraryDetails | null> {
  const sanitizedSubdomain = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
  const data = await redis.get<LibraryDetails>(`library:${sanitizedSubdomain}`);
  return data || null;
}

export async function saveLibraryDetails(subdomain: string, details: LibraryDetails): Promise<void> {
  const sanitizedSubdomain = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
  
  // Get old details to check if custom domain changed
  const oldDetails = await getLibraryDetails(sanitizedSubdomain);
  const oldCustomDomain = oldDetails?.customDomain?.toLowerCase().trim();
  const newCustomDomain = details.customDomain?.toLowerCase().trim();
  
  // Remove old custom domain mapping if it changed
  if (oldCustomDomain && oldCustomDomain !== newCustomDomain) {
    await redis.del(`customdomain:${oldCustomDomain}`);
  }
  
  // Save library details
  await redis.set(`library:${sanitizedSubdomain}`, details);
  
  // Save custom domain mapping if provided
  if (newCustomDomain) {
    await redis.set(`customdomain:${newCustomDomain}`, sanitizedSubdomain);
  }
}

/**
 * Get subdomain from custom domain
 */
export async function getSubdomainFromCustomDomain(customDomain: string): Promise<string | null> {
  const cleanDomain = customDomain.toLowerCase().trim();
  const subdomain = await redis.get<string>(`customdomain:${cleanDomain}`);
  return subdomain || null;
}

export async function getAllSubdomains() {
  const keys = await redis.keys('subdomain:*');

  if (!keys.length) {
    return [];
  }

  const values = await redis.mget<SubdomainData[]>(...keys);

  return keys.map((key, index) => {
    const subdomain = key.replace('subdomain:', '');
    const data = values[index];

    return {
      subdomain,
      emoji: data?.emoji || '❓',
      createdAt: data?.createdAt || Date.now()
    };
  });
}
