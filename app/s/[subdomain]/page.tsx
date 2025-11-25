import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSubdomainData, getLibraryDetails } from '@/lib/subdomains';
import { rootDomain } from '@/lib/utils';
import HomePage from './home/page';

export async function generateMetadata({
  params
}: {
  params: Promise<{ subdomain: string }>;
}): Promise<Metadata> {
  const { subdomain } = await params;
  const subdomainData = await getSubdomainData(subdomain);
  const libraryDetails = await getLibraryDetails(subdomain);

  if (!subdomainData) {
    return {
      title: rootDomain
    };
  }

  return {
    title: libraryDetails?.name || `${subdomain} Library`,
    description: libraryDetails?.description || `Welcome to ${subdomain} Library - Your trusted community library`
  };
}

export default async function SubdomainPage({
  params
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const subdomainData = await getSubdomainData(subdomain);
  const libraryDetails = await getLibraryDetails(subdomain);

  if (!subdomainData) {
    notFound();
  }

  return (
    <HomePage params={{ subdomain }} />
  );
}
