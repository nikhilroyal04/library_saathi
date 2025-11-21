import { notFound } from 'next/navigation';
import { getSubdomainData, getLibraryDetails } from '@/lib/subdomains';
import { BookOpen, Wifi, Monitor, Users, Coffee, Calendar, Printer, Headphones, Sparkles } from 'lucide-react';

export default async function FacilitiesPage({
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

  const facilities = [
    {
      name: 'Reading Areas',
      description: 'Comfortable and spacious reading spaces with natural lighting and ergonomic seating',
      icon: BookOpen,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200'
    },
    {
      name: 'Free Wi-Fi',
      description: 'High-speed internet access throughout the library for all members',
      icon: Wifi,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200'
    },
    {
      name: 'Computer Lab',
      description: 'Fully equipped computer lab with latest software and internet connectivity',
      icon: Monitor,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200'
    },
    {
      name: 'Study Rooms',
      description: 'Private study rooms available for group study and collaborative work',
      icon: Users,
      gradient: 'from-orange-500 to-amber-500',
      bgGradient: 'from-orange-50 to-amber-50',
      borderColor: 'border-orange-200'
    },
    {
      name: 'Café Area',
      description: 'Relaxing café space with refreshments and comfortable seating',
      icon: Coffee,
      gradient: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-50 to-orange-50',
      borderColor: 'border-yellow-200'
    },
    {
      name: 'Event Hall',
      description: 'Large event space for workshops, seminars, and community gatherings',
      icon: Calendar,
      gradient: 'from-indigo-500 to-blue-500',
      bgGradient: 'from-indigo-50 to-blue-50',
      borderColor: 'border-indigo-200'
    },
    {
      name: 'Printing Services',
      description: 'Printing and photocopying services available for members',
      icon: Printer,
      gradient: 'from-cyan-500 to-blue-500',
      bgGradient: 'from-cyan-50 to-blue-50',
      borderColor: 'border-cyan-200'
    },
    {
      name: 'Audio-Visual Room',
      description: 'Dedicated space for multimedia learning and presentations',
      icon: Headphones,
      gradient: 'from-rose-500 to-pink-500',
      bgGradient: 'from-rose-50 to-pink-50',
      borderColor: 'border-rose-200'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1.5 mb-3 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 border-2 border-blue-200">
            <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              🏛️ Library Facilities
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
              Facilities
            </span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto font-medium">
            Discover the wide range of modern facilities and services we offer to enhance your library experience
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <div
                key={index}
                className={`group relative overflow-hidden bg-gradient-to-br ${facility.bgGradient} rounded-xl border-2 ${facility.borderColor} hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${facility.gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
                
                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${facility.gradient} opacity-0 group-hover:opacity-15 rounded-bl-full transition-opacity duration-300`}></div>
                
                <div className="relative z-10 p-6">
                  {/* Icon */}
                  <div className={`w-14 h-14 bg-gradient-to-br ${facility.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-extrabold text-gray-900 mb-2 group-hover:scale-105 transition-transform duration-300">
                    {facility.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">
                    {facility.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${facility.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-100">
          <h3 className="text-lg font-extrabold text-gray-900 mb-4 text-center">Facility Booking</h3>
          <p className="text-gray-700 font-medium text-center mb-6">
            Many of our facilities can be booked in advance. Contact us to reserve study rooms, event spaces, or other facilities.
          </p>
          <div className="text-center">
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm"
            >
              Book a Facility
              <Calendar className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}