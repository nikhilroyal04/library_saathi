import { notFound } from 'next/navigation';
import { getSubdomainData, getLibraryDetails } from '@/lib/subdomains';
import { BookOpen, Users, Award, Heart } from 'lucide-react';

export default async function AboutPage({
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <div className="text-6xl mb-4">{subdomainData.emoji}</div>
          <h2 className="text-2xl text-gray-700">
            {libraryDetails?.name || `${subdomain} Library`}
          </h2>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-600 mb-8">
            {libraryDetails?.description || 
              `Welcome to ${libraryDetails?.name || subdomain} Library, your trusted partner in knowledge and learning. We are committed to providing excellent library services and resources to our community.`}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-gray-600">
                To provide access to knowledge and resources that empower our community.
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
              <p className="text-gray-600">
                To be a leading library that serves as a hub for learning and growth.
              </p>
            </div>
          </div>

          <div className="mt-12 p-8 bg-blue-50 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4 text-center">Why Choose Us?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Award className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Quality Resources</h4>
                  <p className="text-gray-600 text-sm">Access to a wide range of books and digital resources</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Community Focus</h4>
                  <p className="text-gray-600 text-sm">Dedicated to serving our community&apos;s needs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

