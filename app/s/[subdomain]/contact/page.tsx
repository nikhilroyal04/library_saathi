import { notFound } from 'next/navigation';
import { getSubdomainData, getLibraryDetails } from '@/lib/subdomains';
import { Mail, Phone, MapPin, Clock, Globe } from 'lucide-react';

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

  return (
    <div className="bg-white">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Get in touch with {libraryDetails?.name || `${subdomain} Library`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {libraryDetails?.email && (
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Email</h3>
              </div>
              <a 
                href={`mailto:${libraryDetails.email}`}
                className="text-blue-600 hover:text-blue-700"
              >
                {libraryDetails.email}
              </a>
            </div>
          )}

          {libraryDetails?.phone && (
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Phone</h3>
              </div>
              <a 
                href={`tel:${libraryDetails.phone}`}
                className="text-green-600 hover:text-green-700"
              >
                {libraryDetails.phone}
              </a>
            </div>
          )}

          {libraryDetails?.address && (
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Address</h3>
              </div>
              <p className="text-gray-600">{libraryDetails.address}</p>
            </div>
          )}

          {libraryDetails?.timings && (
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Opening Hours</h3>
              </div>
              <p className="text-gray-600">{libraryDetails.timings}</p>
            </div>
          )}

          {libraryDetails?.website && (
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <Globe className="w-5 h-5 text-cyan-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Website</h3>
              </div>
              <a 
                href={libraryDetails.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-600 hover:text-cyan-700"
              >
                {libraryDetails.website}
              </a>
            </div>
          )}
        </div>

        {!libraryDetails?.email && !libraryDetails?.phone && !libraryDetails?.address && (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600">
              Contact information will be displayed here once the library details are updated.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

