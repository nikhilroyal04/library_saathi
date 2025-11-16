import { getCurrentSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getSubdomainData, getLibraryDetails } from '@/lib/subdomains';
import { rootDomain } from '@/lib/utils';
import type { Metadata } from 'next';
import LibraryDetailsForm from './library-details-form';

export const metadata: Metadata = {
  title: `Edit Library Details | ${rootDomain}`,
  description: `Edit library details for subdomain`
};

export default async function EditLibraryPage({
  params
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const session = await getCurrentSession();
  
  if (!session) {
    redirect('/login');
  }

  const { subdomain } = await params;
  const subdomainData = await getSubdomainData(subdomain);
  const libraryDetails = await getLibraryDetails(subdomain);

  if (!subdomainData) {
    redirect('/dashboard/subdomains');
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <LibraryDetailsForm 
        subdomain={subdomain} 
        initialData={libraryDetails || {}}
      />
    </div>
  );
}

