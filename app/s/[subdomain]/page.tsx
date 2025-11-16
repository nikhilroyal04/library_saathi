import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSubdomainData, getLibraryDetails } from '@/lib/subdomains';
import { protocol, rootDomain } from '@/lib/utils';
import { BookOpen, Clock, MapPin, Mail, Phone, Globe } from 'lucide-react';
import Link from 'next/link';

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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <div className="text-8xl md:text-9xl mb-6">{subdomainData.emoji}</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            {libraryDetails?.name || `Welcome to ${subdomain} Library`}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {libraryDetails?.description || 'Your trusted library management solution. Manage books, members, and more with ease.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`${protocol}://${subdomain}.${rootDomain}/contact`}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Contact Us
            </Link>
            <Link
              href={`${protocol}://${subdomain}.${rootDomain}/about`}
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Library Info Section */}
      {libraryDetails && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {libraryDetails.email && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                </div>
                <a href={`mailto:${libraryDetails.email}`} className="text-gray-600 hover:text-blue-600">
                  {libraryDetails.email}
                </a>
              </div>
            )}

            {libraryDetails.phone && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                </div>
                <a href={`tel:${libraryDetails.phone}`} className="text-gray-600 hover:text-green-600">
                  {libraryDetails.phone}
                </a>
              </div>
            )}

            {libraryDetails.address && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                </div>
                <p className="text-gray-600">{libraryDetails.address}</p>
              </div>
            )}

            {libraryDetails.timings && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Timings</h3>
                </div>
                <p className="text-gray-600">{libraryDetails.timings}</p>
              </div>
            )}

            {libraryDetails.website && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-cyan-100 rounded-lg">
                    <Globe className="w-5 h-5 text-cyan-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Website</h3>
                </div>
                <a href={libraryDetails.website} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-cyan-600">
                  {libraryDetails.website}
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience modern library management with our comprehensive solution
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Management</h3>
              <p className="text-gray-600">Manage your library operations with ease</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Access</h3>
              <p className="text-gray-600">Access your library anytime, anywhere</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-gray-600">Your data is safe with our secure system</p>
            </div>
        </div>
      </div>
      </section>
    </div>
  );
}
