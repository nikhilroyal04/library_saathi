'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLibraries, selectLibraries, findLibraryBySubdomainOrCustomDomain } from '@/lib/store/librarySlice';
import { useSubdomainParams } from '@/lib/hooks/useSubdomainParams';
import Image from 'next/image';
import TestimonialSection from '@/components/subdomain/testimonial-section';
import FaqSection from '@/components/subdomain/faq-section';

interface GalleryPageProps {
  params: Promise<{ subdomain: string }> | { subdomain: string };
}

export default function GalleryPage({ params }: GalleryPageProps) {
  const { subdomain } = useSubdomainParams(params);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLibraries() as any);
  }, [dispatch]);

  const libraries = useSelector(selectLibraries);
  const selectedLibrary = useMemo(() => {
    return findLibraryBySubdomainOrCustomDomain(libraries, subdomain);
  }, [libraries, subdomain]);


  // Use library gallery if available, otherwise use defaults
  const libraryGallery = selectedLibrary?.gallery;
  const galleryItems = libraryGallery && libraryGallery.length > 0
    ? libraryGallery.map((item, index) => ({
        id: index + 1,
        title: item.title,
        description: item.description || '',
        icon: item.icon || '📚',
        image: item.image || null,
        color: item.color || 'blue'
      }))
    : [];

  const colors = [
    { bg: 'bg-blue-50', border: 'border-blue-200' },
    { bg: 'bg-purple-50', border: 'border-purple-200' },
    { bg: 'bg-green-50', border: 'border-green-200' },
    { bg: 'bg-orange-50', border: 'border-orange-200' },
    { bg: 'bg-indigo-50', border: 'border-indigo-200' },
    { bg: 'bg-pink-50', border: 'border-pink-200' },
    { bg: 'bg-yellow-50', border: 'border-yellow-200' },
    { bg: 'bg-cyan-50', border: 'border-cyan-200' },
    { bg: 'bg-violet-50', border: 'border-violet-200' }
  ];

  return (
    <div className="bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Our <span className="text-blue-600">Library Spaces</span>
          </h1>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Take a virtual tour of our modern library facilities and see how we create the perfect learning environment
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => {
            const color = colors[index % colors.length];
            return (
            <div
              key={item.id || index}
              className={`group relative overflow-hidden rounded-lg aspect-[4/3] ${color.bg} border ${color.border} hover:border-blue-300 hover:shadow-lg transition-all duration-200 cursor-pointer`}
            >
              {item.image ? (
                <div className="relative w-full h-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-base font-semibold text-white mb-1">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-xs text-gray-200 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl">{item.icon}</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-base font-semibold text-white mb-1">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-xs text-gray-200 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            );
          })}
        </div>
      </section>

      {/* Testimonial Section */}
      <TestimonialSection testimonials={selectedLibrary?.testimonials} />

      {/* FAQ Section */}
      <FaqSection faqs={selectedLibrary?.faqs} />
    </div>
  );
}