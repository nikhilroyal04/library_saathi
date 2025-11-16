import { getAllSubdomains } from '@/lib/subdomains';
import type { Metadata } from 'next';
import { AdminDashboard } from './dashboard';
import { rootDomain } from '@/lib/utils';
import { getCurrentSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: `Admin Dashboard | ${rootDomain}`,
  description: `Manage subdomains for ${rootDomain}`
};

export default async function AdminPage() {
  // Check authentication
  const session = await getCurrentSession();
  
  if (!session) {
    redirect('/login');
  }

  // Get subdomains - admin sees all, regular users see only their subdomains
  let tenants: { subdomain: string; emoji: string; createdAt: number }[] = [];
  if (session.isAdmin) {
    tenants = await getAllSubdomains();
  } else {
    // Get user's subdomains
    const { redis } = await import('@/lib/redis');
    const userSubdomains = await redis.smembers(`user:${session.email}:subdomains`) as string[];
    
    if (userSubdomains.length === 0) {
      tenants = [];
    } else {
      const subdomainData = await Promise.all(
        userSubdomains.map(async (subdomain) => {
          const data = await redis.get<{ emoji: string; createdAt: number }>(`subdomain:${subdomain}`);
          return {
            subdomain,
            emoji: data?.emoji || '❓',
            createdAt: data?.createdAt || Date.now()
          };
        })
      );
      tenants = subdomainData;
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <AdminDashboard tenants={tenants} session={session} />
    </div>
  );
}
