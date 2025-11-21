import { notFound } from 'next/navigation';
import { getSubdomainData, getLibraryDetails } from '@/lib/subdomains';
import { Mail, Phone, MapPin, Clock, Globe, MessageCircle } from 'lucide-react';
import ContactForm from './contact-form';

export default async function ContactPage({
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl mb-6">
            <MessageCircle className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Contact{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
              Us
            </span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto font-medium">
            Get in touch with {libraryName}. We're here to help and answer any questions you may have.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-lg font-extrabold text-gray-900 mb-6">Contact Information</h2>
            
            {libraryDetails?.email && (
              <a 
                href={`mailto:${libraryDetails.email}`}
                className="group flex items-center gap-4 p-5 bg-white rounded-xl border-2 border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">Email</p>
                  <p className="text-sm font-bold text-gray-900">{libraryDetails.email}</p>
                </div>
              </a>
            )}

            {libraryDetails?.phone && (
              <a 
                href={`tel:${libraryDetails.phone}`}
                className="group flex items-center gap-4 p-5 bg-white rounded-xl border-2 border-gray-100 hover:border-green-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">Phone</p>
                  <p className="text-sm font-bold text-gray-900">{libraryDetails.phone}</p>
                </div>
              </a>
            )}

            {libraryDetails?.address && (
              <div className="flex items-start gap-4 p-5 bg-white rounded-xl border-2 border-gray-100">
                <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">Address</p>
                  <p className="text-sm font-bold text-gray-900">{libraryDetails.address}</p>
                </div>
              </div>
            )}

            {libraryDetails?.timings && (
              <div className="flex items-start gap-4 p-5 bg-white rounded-xl border-2 border-gray-100">
                <div className="p-3 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">Opening Hours</p>
                  <p className="text-sm font-bold text-gray-900">{libraryDetails.timings}</p>
                </div>
              </div>
            )}

            {libraryDetails?.website && (
              <a 
                href={libraryDetails.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 bg-white rounded-xl border-2 border-gray-100 hover:border-cyan-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="p-3 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">Website</p>
                  <p className="text-sm font-bold text-gray-900">{libraryDetails.website}</p>
                </div>
              </a>
            )}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

