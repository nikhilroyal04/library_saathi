'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLibraries, selectLibraries, findLibraryBySubdomainOrCustomDomain } from '@/lib/store/librarySlice';
import { useSubdomainParams } from '@/lib/hooks/useSubdomainParams';
import { Mail, Phone, MapPin, Clock, Globe, MessageCircle } from 'lucide-react';
import ContactForm from './contact-form';
import TestimonialSection from '@/components/subdomain/testimonial-section';
import FaqSection from '@/components/subdomain/faq-section';

interface ContactPageProps {
  params: Promise<{ subdomain: string }> | { subdomain: string };
}

export default function ContactPage({ params }: ContactPageProps) {
  const { subdomain } = useSubdomainParams(params);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLibraries() as any);
  }, [dispatch]);

  const libraries = useSelector(selectLibraries);
  const selectedLibrary = useMemo(() => {
    return findLibraryBySubdomainOrCustomDomain(libraries, subdomain);
  }, [libraries, subdomain]);

  const libraryName = selectedLibrary?.name || `${subdomain} Library`;
  const libraryDetails = selectedLibrary;

  return (
    <div className="bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-2xl mb-6">
            <MessageCircle className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact <span className="text-blue-600">Us</span>
          </h1>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Get in touch with {libraryName}. We're here to help and answer any questions you may have about our library services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Contact Information</h2>
            
            {libraryDetails?.email && (
              <a 
                href={`mailto:${libraryDetails.email}`}
                className="group flex items-center gap-4 p-5 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
              >
                <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Email</p>
                  <p className="text-sm font-semibold text-gray-900">{libraryDetails.email}</p>
                </div>
              </a>
            )}

            {libraryDetails?.phone && (
              <a 
                href={`tel:${libraryDetails.phone}`}
                className="group flex items-center gap-4 p-5 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
              >
                <div className="p-3 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Phone</p>
                  <p className="text-sm font-semibold text-gray-900">{libraryDetails.phone}</p>
                </div>
              </a>
            )}

            {libraryDetails?.address && (
              <div className="flex items-start gap-4 p-5 bg-white rounded-lg border border-gray-200">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Address</p>
                  <p className="text-sm font-semibold text-gray-900">{libraryDetails.address}</p>
                </div>
              </div>
            )}

            {libraryDetails?.timings && (
              <div className="flex items-start gap-4 p-5 bg-white rounded-lg border border-gray-200">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Opening Hours</p>
                  <p className="text-sm font-semibold text-gray-900">{libraryDetails.timings}</p>
                </div>
              </div>
            )}

            {libraryDetails?.website && (
              <a 
                href={libraryDetails.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
              >
                <div className="p-3 bg-cyan-50 rounded-lg group-hover:bg-cyan-100 transition-colors">
                  <Globe className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Website</p>
                  <p className="text-sm font-semibold text-gray-900">{libraryDetails.website}</p>
                </div>
              </a>
            )}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm params={params} />
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <TestimonialSection testimonials={selectedLibrary?.testimonials} />

      {/* FAQ Section */}
      <FaqSection faqs={selectedLibrary?.faqs} />
    </div>
  );
}

