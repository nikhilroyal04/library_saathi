import { getCurrentSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { rootDomain } from '@/lib/utils';
import type { Metadata } from 'next';
import LeadsOverview from './leads-overview';

export const metadata: Metadata = {
  title: `Leads | ${rootDomain}`,
  description: `Manage leads for ${rootDomain}`
};

export default async function LeadsPage() {
  const session = await getCurrentSession();
  
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <LeadsOverview />
    </div>
  );
}
