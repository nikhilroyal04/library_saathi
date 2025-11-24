import { notFound } from 'next/navigation';
import { getSubdomainData, getLibraryDetails } from '@/lib/subdomains';
import { BookOpen, Users, Award, Heart, Target, Sparkles, MapPin, Mail, Phone } from 'lucide-react';
import TestimonialSection from '@/components/subdomain/testimonial-section';
import FaqSection from '@/components/subdomain/faq-section';

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

  const libraryName = libraryDetails?.name || `${subdomain} Library`;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-2xl mb-6">
            <div className="text-5xl">{subdomainData.emoji}</div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-blue-600">{libraryName}</span>
          </h1>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            {libraryDetails?.description || 
              `Welcome to ${libraryName}, your trusted community library. We are committed to providing excellent library services, a peaceful reading environment, and quality resources to all our members.`}
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          <div className="p-8 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To provide access to knowledge and resources that empower our community. We strive to make learning accessible, enjoyable, and transformative for everyone who walks through our doors.
            </p>
          </div>

          <div className="p-8 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
              <Sparkles className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To be a leading community library that serves as a hub for learning and growth. We envision a community where knowledge flows freely and every individual can achieve their full potential through reading and learning.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Why Choose <span className="text-blue-600">Us?</span>
            </h2>
            <p className="text-base text-gray-600">Discover what makes our library special</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Quality Resources</h4>
              <p className="text-sm text-gray-600">Access to a wide range of books and digital resources for all ages</p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-center">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Community Focus</h4>
              <p className="text-sm text-gray-600">Dedicated to serving our community's reading and learning needs</p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-center">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Modern Facilities</h4>
              <p className="text-sm text-gray-600">Comfortable reading spaces and well-maintained facilities</p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-center">
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Expert Staff</h4>
              <p className="text-sm text-gray-600">Knowledgeable and friendly team ready to assist you</p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        {(libraryDetails?.email || libraryDetails?.phone || libraryDetails?.address) && (
          <div className="mt-20 p-8 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">Get In Touch</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {libraryDetails?.email && (
                <a 
                  href={`mailto:${libraryDetails.email}`}
                  className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase">Email</p>
                    <p className="text-sm font-semibold text-gray-900">{libraryDetails.email}</p>
                  </div>
                </a>
              )}
              {libraryDetails?.phone && (
                <a 
                  href={`tel:${libraryDetails.phone}`}
                  className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase">Phone</p>
                    <p className="text-sm font-semibold text-gray-900">{libraryDetails.phone}</p>
                  </div>
                </a>
              )}
              {libraryDetails?.address && (
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase">Address</p>
                    <p className="text-sm font-semibold text-gray-900">{libraryDetails.address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Testimonial Section */}
      <TestimonialSection />

      {/* FAQ Section */}
      <FaqSection />
    </div>
  );
}

