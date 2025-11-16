'use server';

import { redis } from '@/lib/redis';
import { isValidIcon, saveLibraryDetails, type LibraryDetails } from '@/lib/subdomains';
import { revalidatePath } from 'next/cache';
import { rootDomain, protocol } from '@/lib/utils';
import {
  verifyCredentials,
  createSession,
  setSessionCookie,
  getCurrentSession,
  clearSessionCookie,
  deleteSession,
  hasSubdomainAccess
} from '@/lib/auth';
import { redirect } from 'next/navigation';

type CreateSubdomainState = {
  success?: boolean;
  error?: string;
  subdomain?: string;
  icon?: string;
  redirectUrl?: string;
};

export async function createSubdomainAction(
  prevState: CreateSubdomainState | undefined,
  formData: FormData
): Promise<CreateSubdomainState> {
  // Check authentication
  const session = await getCurrentSession();
  if (!session) {
    return { success: false, error: 'You must be logged in to create a subdomain' };
  }

  const subdomain = formData.get('subdomain') as string;
  const icon = formData.get('icon') as string;

  if (!subdomain || !icon) {
    return { success: false, error: 'Subdomain and icon are required' };
  }

  if (!isValidIcon(icon)) {
    return {
      subdomain,
      icon,
      success: false,
      error: 'Please enter a valid emoji (maximum 10 characters)'
    };
  }

  const sanitizedSubdomain = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');

  if (sanitizedSubdomain !== subdomain) {
    return {
      subdomain,
      icon,
      success: false,
      error:
        'Subdomain can only have lowercase letters, numbers, and hyphens. Please try again.'
    };
  }

  const subdomainAlreadyExists = await redis.get(
    `subdomain:${sanitizedSubdomain}`
  );
  if (subdomainAlreadyExists) {
    return {
      subdomain,
      icon,
      success: false,
      error: 'This subdomain is already taken'
    };
  }

  // Store subdomain with owner information
  await redis.set(`subdomain:${sanitizedSubdomain}`, {
    emoji: icon,
    createdAt: Date.now(),
    ownerEmail: session.email,
    ownerSubdomain: session.subdomain
  });

  // Link subdomain to user
  await redis.sadd(`user:${session.email}:subdomains`, sanitizedSubdomain);

  // Return success with redirect URL for client-side redirect
  // This is more reliable for cross-subdomain redirects
  const redirectUrl = `${protocol}://${sanitizedSubdomain}.${rootDomain}`;
  return {
    success: true,
    subdomain: sanitizedSubdomain,
    icon,
    redirectUrl
  };
}

type DeleteSubdomainState = {
  error?: string;
  success?: string;
};

export async function deleteSubdomainAction(
  prevState: DeleteSubdomainState | undefined,
  formData: FormData
): Promise<DeleteSubdomainState> {
  // Check authentication
  const session = await getCurrentSession();
  if (!session) {
    return { error: 'You must be logged in to delete a subdomain' };
  }

  const subdomain = formData.get('subdomain') as string;

  if (!subdomain) {
    return { error: 'Subdomain is required' };
  }

  // Check if user has access to this subdomain
  const hasAccess = await hasSubdomainAccess(session, subdomain);
  if (!hasAccess) {
    return { error: 'You do not have permission to delete this subdomain' };
  }

  // Get subdomain data to check owner
  const subdomainData = await redis.get<{ ownerEmail?: string }>(`subdomain:${subdomain}`);
  
  // Only admin or owner can delete
  if (!session.isAdmin && subdomainData?.ownerEmail !== session.email) {
    return { error: 'You do not have permission to delete this subdomain' };
  }

  await redis.del(`subdomain:${subdomain}`);
  
  // Remove from user's subdomain list
  if (subdomainData?.ownerEmail) {
    await redis.srem(`user:${subdomainData.ownerEmail}:subdomains`, subdomain);
  }

  revalidatePath('/dashboard');
  return { success: 'Subdomain deleted successfully' };
}

type LoginState = {
  error?: string;
  success?: boolean;
  redirectUrl?: string;
};

/**
 * Login action
 */
export async function loginAction(
  prevState: LoginState | undefined,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  // Verify credentials
  if (!verifyCredentials(email, password)) {
    return { error: 'Invalid email or password' };
  }

  // Create session
  const isAdmin = email === 'admin@librarysaathi.com';
  const sessionId = await createSession(email, undefined, isAdmin);
  await setSessionCookie(sessionId);

  // Redirect to dashboard
  return {
    success: true,
    redirectUrl: '/dashboard'
  };
}

/**
 * Logout action
 */
export async function logoutAction() {
  const session = await getCurrentSession();
  if (session) {
    const cookieStore = await (await import('next/headers')).cookies();
    const sessionId = cookieStore.get('library_saathi_session')?.value;
    if (sessionId) {
      await deleteSession(sessionId);
    }
  }
  await clearSessionCookie();
  redirect('/login');
}

type SaveLibraryDetailsState = {
  success?: boolean;
  error?: string;
  message?: string;
};

/**
 * Save library details action
 */
export async function saveLibraryDetailsAction(
  prevState: SaveLibraryDetailsState | undefined,
  formData: FormData
): Promise<SaveLibraryDetailsState> {
  // Check authentication
  const session = await getCurrentSession();
  if (!session) {
    return { success: false, error: 'You must be logged in to save library details' };
  }

  const subdomain = formData.get('subdomain') as string;
  if (!subdomain) {
    return { success: false, error: 'Subdomain is required' };
  }

  // Check if user has access to this subdomain
  const hasAccess = await hasSubdomainAccess(session, subdomain);
  if (!hasAccess) {
    return { success: false, error: 'You do not have permission to edit this subdomain' };
  }

  const details: LibraryDetails = {
    name: formData.get('name') as string || undefined,
    description: formData.get('description') as string || undefined,
    logo: formData.get('logo') as string || undefined,
    email: formData.get('email') as string || undefined,
    phone: formData.get('phone') as string || undefined,
    address: formData.get('address') as string || undefined,
    website: formData.get('website') as string || undefined,
    timings: formData.get('timings') as string || undefined,
    customDomain: formData.get('customDomain') as string || undefined,
  };

  await saveLibraryDetails(subdomain, details);
  revalidatePath(`/s/${subdomain}`);
  revalidatePath('/dashboard/subdomains');

  return {
    success: true,
    message: 'Library details saved successfully!'
  };
}
