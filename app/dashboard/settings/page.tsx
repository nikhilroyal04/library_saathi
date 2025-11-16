import { getCurrentSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { rootDomain } from '@/lib/utils';
import type { Metadata } from 'next';
import SettingsOverview from './settings-overview';

export const metadata: Metadata = {
  title: `Settings | ${rootDomain}`,
  description: `Settings for ${rootDomain}`
};

export default async function SettingsPage() {
  const session = await getCurrentSession();
  
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <SettingsOverview session={session} />
    </div>
  );
}
