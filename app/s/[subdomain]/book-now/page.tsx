'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLibraries, selectLibraries, findLibraryBySubdomainOrCustomDomain } from '@/lib/store/librarySlice';
import { useSubdomainParams } from '@/lib/hooks/useSubdomainParams';
import { Calendar, Clock, User, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import BookNowForm from './book-now-form';
import TestimonialSection from '@/components/subdomain/testimonial-section';
import FaqSection from '@/components/subdomain/faq-section';

interface BookNowPageProps {
  params: Promise<{ subdomain: string }> | { subdomain: string };
}

export default function BookNowPage({ params }: BookNowPageProps) {
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
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-2xl mb-6">
            <Calendar className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Reserve Your <span className="text-blue-600">Study Space</span>
          </h1>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Schedule a visit to {libraryName} and explore our facilities. Fill out the form below and we'll confirm your booking.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 sticky top-24">
              <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-900 mb-1">Why Reserve?</h3>
                <p className="text-sm text-gray-600">Benefits of booking in advance</p>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">Guided Tour</h3>
                    <p className="text-sm text-gray-600">
                      Get a personalized tour of our library facilities and resources
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">Expert Assistance</h3>
                    <p className="text-sm text-gray-600">
                      Meet with our librarians for personalized recommendations
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">Flexible Timing</h3>
                    <p className="text-sm text-gray-600">
                      Choose a time slot that works best for your schedule
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              {(libraryDetails?.email || libraryDetails?.phone || libraryDetails?.address) && (
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">
                    Contact Information
                  </h4>
                  <div className="space-y-3">
                    {libraryDetails?.phone && (
                      <a 
                        href={`tel:${libraryDetails.phone}`}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors group"
                      >
                        <div className="p-1.5 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                          <Phone className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{libraryDetails.phone}</span>
                      </a>
                    )}
                    {libraryDetails?.email && (
                      <a 
                        href={`mailto:${libraryDetails.email}`}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors group"
                      >
                        <div className="p-1.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                          <Mail className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{libraryDetails.email}</span>
                      </a>
                    )}
                    {libraryDetails?.address && (
                      <div className="flex items-start gap-3 p-2">
                        <div className="p-1.5 bg-purple-50 rounded-lg mt-0.5">
                          <MapPin className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 leading-relaxed">{libraryDetails.address}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <BookNowForm libraryName={libraryName} params={params} />
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

