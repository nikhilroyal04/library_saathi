import { notFound } from 'next/navigation';
import { getSubdomainData, getLibraryDetails } from '@/lib/subdomains';
import SubdomainHeader from '@/components/subdomain/Header';
import Topbar from '@/components/subdomain/Topbar';
import SubdomainFooter from '@/components/subdomain/Footer';

export default async function SubdomainLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const subdomainData = await getSubdomainData(subdomain);

  if (!subdomainData) {
    notFound();
  }

  const libraryDetails = await getLibraryDetails(subdomain);

  return (
      <div className="flex flex-col min-h-screen">
        <Topbar />
        <SubdomainHeader libraryDetails={libraryDetails || undefined} subdomain={subdomain} />
        <main className="flex-1">
          {children}
        </main>
        <SubdomainFooter libraryDetails={libraryDetails || undefined} subdomain={subdomain} />
      </div>
  );
}

