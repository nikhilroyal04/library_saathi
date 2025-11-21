import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSubdomainData, getLibraryDetails } from '@/lib/subdomains';
import { rootDomain } from '@/lib/utils';
import HeroSection from '@/components/subdomain/hero-section';
import ShiftPlanSection from '@/components/subdomain/shift-plan-section';
import TestimonialSection from '@/components/subdomain/testimonial-section';
import GallerySection from '@/components/subdomain/gallery-section';
import FaqSection from '@/components/subdomain/faq-section';

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
    description: libraryDetails?.description || `Welcome to ${subdomain} Library - Your trusted library management solution`
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
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto ">
        <HeroSection 
          subdomain={subdomain} 
          libraryDetails={libraryDetails || undefined}
          emoji={subdomainData.emoji}
        />
      </section>

      <ShiftPlanSection />
      <TestimonialSection />
      <GallerySection />
      <FaqSection />

    </div>
  );
}
