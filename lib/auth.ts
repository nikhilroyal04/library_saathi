import { cookies } from 'next/headers';
import { redis } from './redis';

// Demo credentials - replace with real authentication later
export const DEMO_CREDENTIALS = {
  email: 'admin@librarysaathi.in',
  password: 'admin123',
  subdomain: 'admin' // Default admin subdomain
};

export type SessionData = {
  email: string;
  subdomain?: string;
  isAdmin?: boolean;
  loginTime: number;
};

const SESSION_COOKIE_NAME = 'library_saathi_session';
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Create a session for the user
 */
export async function createSession(email: string, subdomain?: string, isAdmin: boolean = false): Promise<string> {
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  const sessionData: SessionData = {
    email,
    subdomain,
    isAdmin,
    loginTime: Date.now()
  };

  // Store session in Redis - Upstash automatically serializes objects
  await redis.setex(`session:${sessionId}`, SESSION_DURATION / 1000, sessionData);

  return sessionId;
}

/**
 * Get session data from session ID
 */
export async function getSession(sessionId: string): Promise<SessionData | null> {
  try {
    const sessionData = await redis.get<SessionData>(`session:${sessionId}`);
    if (!sessionData) {
      return null;
    }
    
    // Upstash Redis automatically deserializes JSON, so it should be an object
    // But handle both cases for safety
    if (typeof sessionData === 'object' && sessionData !== null && 'email' in sessionData) {
      return sessionData as SessionData;
    }
    
    // Fallback: if it's a string (shouldn't happen with Upstash, but just in case)
    if (typeof sessionData === 'string') {
      try {
        return JSON.parse(sessionData) as SessionData;
      } catch {
        return null;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

/**
 * Delete session
 */
export async function deleteSession(sessionId: string): Promise<void> {
  await redis.del(`session:${sessionId}`);
}

/**
 * Get current session from cookies (server-side)
 */
export async function getCurrentSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionId) {
    return null;
  }

  return getSession(sessionId);
}

/**
 * Set session cookie
 */
export async function setSessionCookie(sessionId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/'
  });
}

/**
 * Clear session cookie
 */
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Verify credentials
 */
export function verifyCredentials(email: string, password: string): boolean {
  return email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password;
}

/**
 * Check if user has access to a subdomain
 */
export async function hasSubdomainAccess(session: SessionData, subdomain: string): Promise<boolean> {
  // Admin has access to all subdomains
  if (session.isAdmin) {
    return true;
  }

  // Check if user's subdomain matches
  if (session.subdomain === subdomain) {
    return true;
  }

  // Check if subdomain exists and user owns it
  const subdomainData = await redis.get<{ ownerEmail?: string }>(`subdomain:${subdomain}`);
  if (!subdomainData) {
    return false;
  }

  // Check if user owns this subdomain
  if (subdomainData.ownerEmail === session.email) {
    return true;
  }

  // Check if user has this subdomain in their list
  const userSubdomains = await redis.smembers(`user:${session.email}:subdomains`) as string[];
  return userSubdomains.includes(subdomain);
}

