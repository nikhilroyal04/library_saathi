'use client';

import { fetchLibraries, selectLibraries, findLibraryBySubdomainOrCustomDomain } from '@/lib/store/librarySlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { useSubdomainParams } from '@/lib/hooks/useSubdomainParams';
import HeroSection from '@/components/subdomain/hero-section';
import ShiftPlanSection from '@/components/subdomain/shift-plan-section';
import TestimonialSection from '@/components/subdomain/testimonial-section';
import GallerySection from '@/components/subdomain/gallery-section';
import FaqSection from '@/components/subdomain/faq-section';

interface HomePageProps {
  params: Promise<{ subdomain: string }> | { subdomain: string };
}

export default function HomePage({ params }: HomePageProps) {
  const { subdomain } = useSubdomainParams(params);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLibraries() as any);
  }, [dispatch]);

  const libraries = useSelector(selectLibraries);
  // params.subdomain se related library dhundh ke details bhejo (subdomain ya customDomain se match)
  const selectedLibrary = useMemo(() => {
    return findLibraryBySubdomainOrCustomDomain(libraries, subdomain);
  }, [libraries, subdomain]);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="mx-auto ">
        <HeroSection 
          subdomain={subdomain} 
          libraryDetails={selectedLibrary || undefined}
          emoji={'🏢'}
        />
      </section>
      <ShiftPlanSection shifts={selectedLibrary?.shifts} />
      <TestimonialSection testimonials={selectedLibrary?.testimonials} />
      <GallerySection galleryItems={selectedLibrary?.gallery} />
      <FaqSection faqs={selectedLibrary?.faqs} />
    </div>
  );
}