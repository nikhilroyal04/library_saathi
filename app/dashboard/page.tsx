import { getCurrentSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getAllSubdomains } from '@/lib/subdomains';
import { rootDomain } from '@/lib/utils';
import type { Metadata } from 'next';
import DashboardOverview from './dashboard-overview';

export const metadata: Metadata = {
  title: `Dashboard | ${rootDomain}`,
  description: `Dashboard overview for ${rootDomain}`
};

export default async function DashboardPage() {
  const session = await getCurrentSession();
  
  if (!session) {
    redirect('/login');
  }

  // Get stats
  let totalSubdomains = 0;
  if (session.isAdmin) {
    const allSubdomains = await getAllSubdomains();
    totalSubdomains = allSubdomains.length;
  } else {
    const { redis } = await import('@/lib/redis');
    const userSubdomains = await redis.smembers(`user:${session.email}:subdomains`) as string[];
    totalSubdomains = userSubdomains.length;
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <DashboardOverview session={session} totalSubdomains={totalSubdomains} />
    </div>
  );
}
