import { notFound } from 'next/navigation';
import { getSubdomainData, getLibraryDetails } from '@/lib/subdomains';
import { BookOpen, Wifi, Monitor, Users, Coffee, Calendar, Printer, Headphones } from 'lucide-react';
import TestimonialSection from '@/components/subdomain/testimonial-section';
import FaqSection from '@/components/subdomain/faq-section';

export default async function FacilitiesPage({
  params
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const subdomainData = await getSubdomainData(subdomain);

  if (!subdomainData) {
    notFound();
  }

  const facilities = [
    {
      name: 'Reading Areas',
      description: 'Comfortable and spacious reading spaces with natural lighting and ergonomic seating',
      icon: BookOpen,
      color: 'blue'
    },
    {
      name: 'Free Wi-Fi',
      description: 'High-speed internet access throughout the library for all members',
      icon: Wifi,
      color: 'green'
    },
    {
      name: 'Computer Lab',
      description: 'Fully equipped computer lab with latest software and internet connectivity',
      icon: Monitor,
      color: 'purple'
    },
    {
      name: 'Study Rooms',
      description: 'Private study rooms available for group study and collaborative work',
      icon: Users,
      color: 'orange'
    },
    {
      name: 'Café Area',
      description: 'Relaxing café space with refreshments and comfortable seating',
      icon: Coffee,
      color: 'yellow'
    },
    {
      name: 'Event Hall',
      description: 'Large event space for workshops, seminars, and community gatherings',
      icon: Calendar,
      color: 'indigo'
    },
    {
      name: 'Printing Services',
      description: 'Printing and photocopying services available for members',
      icon: Printer,
      color: 'cyan'
    },
    {
      name: 'Audio-Visual Room',
      description: 'Dedicated space for multimedia learning and presentations',
      icon: Headphones,
      color: 'pink'
    }
  ];

  const colorClasses: Record<string, { bg: string; border: string; icon: string }> = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600' },
    green: { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-600' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-600' },
    orange: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'text-orange-600' },
    yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: 'text-yellow-600' },
    indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', icon: 'text-indigo-600' },
    cyan: { bg: 'bg-cyan-50', border: 'border-cyan-200', icon: 'text-cyan-600' },
    pink: { bg: 'bg-pink-50', border: 'border-pink-200', icon: 'text-pink-600' }
  };

  return (
    <div className="bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Facilities</span>
          </h1>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Discover the wide range of modern facilities and services we offer to enhance your library experience
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            const colors = colorClasses[facility.color];
            return (
              <div
                key={index}
                className={`p-6 bg-white rounded-lg border ${colors.border} hover:border-blue-300 hover:shadow-md transition-all duration-200`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {facility.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {facility.description}
                </p>
              </div>
            );
          })}
        </div>


      </section>

      {/* Testimonial Section */}
      <TestimonialSection />

      {/* FAQ Section */}
      <FaqSection />
    </div>
  );
}