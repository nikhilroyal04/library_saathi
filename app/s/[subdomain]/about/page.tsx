import { notFound } from 'next/navigation';
import { getSubdomainData, getLibraryDetails } from '@/lib/subdomains';
import { BookOpen, Users, Award, Heart, Target, Sparkles, Clock, MapPin, Mail, Phone } from 'lucide-react';
import Image from 'next/image';

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
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl mb-6">
            <div className="text-5xl">{subdomainData.emoji}</div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            About{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
              {libraryName}
            </span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto font-medium">
            {libraryDetails?.description || 
              `Welcome to ${libraryName}, your trusted partner in knowledge and learning. We are committed to providing excellent library services and resources to our community.`}
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="group p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-extrabold text-gray-900 mb-3">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed font-medium">
              To provide access to knowledge and resources that empower our community. We strive to make learning accessible, enjoyable, and transformative for everyone.
            </p>
          </div>

          <div className="group p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-extrabold text-gray-900 mb-3">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed font-medium">
              To be a leading library that serves as a hub for learning and growth. We envision a community where knowledge flows freely and every individual can achieve their full potential.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
                Us?
              </span>
            </h2>
            <p className="text-gray-600 font-medium">Discover what makes us special</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 bg-white rounded-xl border-2 border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7 text-blue-600" />
              </div>
              <h4 className="font-extrabold text-gray-900 mb-2">Quality Resources</h4>
              <p className="text-sm text-gray-600 font-medium">Access to a wide range of books and digital resources</p>
            </div>

            <div className="p-6 bg-white rounded-xl border-2 border-gray-100 hover:border-green-300 hover:shadow-lg transition-all duration-300 text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-7 h-7 text-green-600" />
              </div>
              <h4 className="font-extrabold text-gray-900 mb-2">Community Focus</h4>
              <p className="text-sm text-gray-600 font-medium">Dedicated to serving our community's needs</p>
            </div>

            <div className="p-6 bg-white rounded-xl border-2 border-gray-100 hover:border-purple-300 hover:shadow-lg transition-all duration-300 text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-7 h-7 text-purple-600" />
              </div>
              <h4 className="font-extrabold text-gray-900 mb-2">Modern Facilities</h4>
              <p className="text-sm text-gray-600 font-medium">State-of-the-art infrastructure and technology</p>
            </div>

            <div className="p-6 bg-white rounded-xl border-2 border-gray-100 hover:border-orange-300 hover:shadow-lg transition-all duration-300 text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-orange-600" />
              </div>
              <h4 className="font-extrabold text-gray-900 mb-2">Expert Staff</h4>
              <p className="text-sm text-gray-600 font-medium">Knowledgeable and friendly team ready to help</p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        {(libraryDetails?.email || libraryDetails?.phone || libraryDetails?.address) && (
          <div className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-100">
            <h3 className="text-lg font-extrabold text-gray-900 mb-6 text-center">Get In Touch</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {libraryDetails?.email && (
                <a 
                  href={`mailto:${libraryDetails.email}`}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md transition-all duration-300 group"
                >
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase">Email</p>
                    <p className="text-sm font-bold text-gray-900">{libraryDetails.email}</p>
                  </div>
                </a>
              )}
              {libraryDetails?.phone && (
                <a 
                  href={`tel:${libraryDetails.phone}`}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md transition-all duration-300 group"
                >
                  <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase">Phone</p>
                    <p className="text-sm font-bold text-gray-900">{libraryDetails.phone}</p>
                  </div>
                </a>
              )}
              {libraryDetails?.address && (
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase">Address</p>
                    <p className="text-sm font-bold text-gray-900">{libraryDetails.address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

