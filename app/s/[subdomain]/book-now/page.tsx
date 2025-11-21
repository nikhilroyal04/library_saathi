import { notFound } from 'next/navigation';
import { getSubdomainData, getLibraryDetails } from '@/lib/subdomains';
import { Calendar, Clock, User, Mail, Phone, MapPin, CheckCircle, Sparkles } from 'lucide-react';
import BookNowForm from './book-now-form';

export default async function BookNowPage({
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

  const libraryName = libraryDetails?.name || `${subdomain} Library`;

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl mb-6">
            <Calendar className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Book Your{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
              Appointment
            </span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto font-medium">
            Schedule a visit to {libraryName} and explore our facilities. Fill out the form below and we'll confirm your appointment.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200 sticky top-24">
              <div className="inline-flex items-center px-3 py-1.5 mb-6 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 border-2 border-blue-200">
                <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  Why Book?
                </span>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-md">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900 mb-1">Guided Tour</h3>
                    <p className="text-sm text-gray-700 font-medium">
                      Get a personalized tour of our library facilities and resources
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-md">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900 mb-1">Expert Assistance</h3>
                    <p className="text-sm text-gray-700 font-medium">
                      Meet with our librarians for personalized recommendations
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900 mb-1">Flexible Timing</h3>
                    <p className="text-sm text-gray-700 font-medium">
                      Choose a time slot that works best for your schedule
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              {(libraryDetails?.email || libraryDetails?.phone || libraryDetails?.address) && (
                <div className="p-4 bg-white rounded-xl border-2 border-blue-100">
                  <h4 className="text-sm font-extrabold text-gray-900 mb-4 uppercase tracking-wider">
                    Contact Information
                  </h4>
                  <div className="space-y-3">
                    {libraryDetails?.phone && (
                      <a 
                        href={`tel:${libraryDetails.phone}`}
                        className="flex items-center gap-3 p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                      >
                        <div className="p-1.5 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                          <Phone className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-sm font-bold text-gray-900">{libraryDetails.phone}</span>
                      </a>
                    )}
                    {libraryDetails?.email && (
                      <a 
                        href={`mailto:${libraryDetails.email}`}
                        className="flex items-center gap-3 p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                      >
                        <div className="p-1.5 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                          <Mail className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-bold text-gray-900">{libraryDetails.email}</span>
                      </a>
                    )}
                    {libraryDetails?.address && (
                      <div className="flex items-start gap-3 p-2">
                        <div className="p-1.5 bg-purple-100 rounded-lg mt-0.5">
                          <MapPin className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="text-sm font-bold text-gray-900 leading-relaxed">{libraryDetails.address}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <BookNowForm libraryName={libraryName} />
          </div>
        </div>
      </section>
    </div>
  );
}

