import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSubdomainData, getLibraryDetails } from '@/lib/subdomains';
import { Clock, Calendar, Users, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';
import TestimonialSection from '@/components/subdomain/testimonial-section';
import FaqSection from '@/components/subdomain/faq-section';

export default async function ShiftPlansPage({
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

  const shifts = [
    {
      name: 'Morning Shift',
      time: '8:00 AM - 12:00 PM',
      icon: '🌅',
      color: 'orange',
      description: 'Start your day with our morning shift. Perfect for early birds and morning study sessions.',
      features: ['Quiet study environment', 'Fresh morning atmosphere', 'Early access to resources', 'Morning refreshments available'],
      status: 'active',
      capacity: '85%',
      staffCount: 3
    },
    {
      name: 'Afternoon Shift',
      time: '12:00 PM - 4:00 PM',
      icon: '☀️',
      color: 'yellow',
      description: 'The busiest shift of the day. Ideal for group studies and collaborative work.',
      features: ['High activity period', 'Group study areas', 'Lunch break facilities', 'Maximum staff availability'],
      status: 'active',
      capacity: '95%',
      staffCount: 5
    },
    {
      name: 'Evening Shift',
      time: '4:00 PM - 8:00 PM',
      icon: '🌆',
      color: 'purple',
      description: 'Perfect for evening learners and after-work study sessions.',
      features: ['Post-work study time', 'Evening programs', 'Extended hours', 'Relaxed atmosphere'],
      status: 'active',
      capacity: '70%',
      staffCount: 4
    },
    {
      name: 'Night Shift',
      time: '8:00 PM - 12:00 AM',
      icon: '🌙',
      color: 'indigo',
      description: 'Late-night study sessions for night owls and dedicated learners.',
      features: ['24/7 access available', 'Quiet night environment', 'Night study support', 'Limited staff'],
      status: 'limited',
      capacity: '45%',
      staffCount: 2
    }
  ];

  const colorClasses: Record<string, { bg: string; border: string; icon: string; text: string }> = {
    orange: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'text-orange-600', text: 'text-orange-700' },
    yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: 'text-yellow-600', text: 'text-yellow-700' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-600', text: 'text-purple-700' },
    indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', icon: 'text-indigo-600', text: 'text-indigo-700' }
  };

  const features = [
    {
      icon: Users,
      title: 'Dedicated Staff',
      description: 'Our experienced staff members are available during each shift to assist you with all your library needs',
      color: 'blue'
    },
    {
      icon: Calendar,
      title: 'Flexible Timing',
      description: 'Visit us at any time during our operating hours. We have shifts throughout the day to accommodate your schedule',
      color: 'green'
    },
    {
      icon: RotateCcw,
      title: 'Consistent Service',
      description: 'We maintain consistent quality of service across all shifts, ensuring you have a great experience whenever you visit',
      color: 'purple'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-2xl mb-6">
            <Clock className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Library Shifts</span>
          </h1>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Explore our shift schedules and find the perfect time to visit {libraryName}. Each shift offers unique benefits and facilities.
          </p>
        </div>

        {/* Shifts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {shifts.map((shift, index) => {
            const colors = colorClasses[shift.color];
            return (
            <div
              key={index}
              className={`p-6 bg-white rounded-lg border ${colors.border} hover:border-blue-300 hover:shadow-md transition-all duration-200`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 ${colors.bg} rounded-lg`}>
                  <span className="text-4xl">{shift.icon}</span>
                </div>
                <div className="flex items-center gap-2">
                  {shift.status === 'active' ? (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 rounded-full border border-green-200">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs font-semibold text-green-700">Active</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 rounded-full border border-yellow-200">
                      <AlertCircle className="w-3 h-3 text-yellow-600" />
                      <span className="text-xs font-semibold text-yellow-700">Limited</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {shift.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className={`w-5 h-5 ${colors.icon}`} />
                  <span className={`text-base font-semibold ${colors.text}`}>
                    {shift.time}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {shift.description}
                </p>
              </div>

              {/* Features */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Features:</h4>
                <ul className="space-y-2">
                  {shift.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className={`w-4 h-4 ${colors.icon} flex-shrink-0`} />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Capacity</p>
                  <p className={`text-lg font-semibold ${colors.text}`}>{shift.capacity}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Staff</p>
                  <p className={`text-lg font-semibold ${colors.text}`}>{shift.staffCount} Members</p>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Why Choose <span className="text-blue-600">Our Shifts?</span>
            </h2>
            <p className="text-base text-gray-600">Each shift offers unique benefits for our library members</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colorMap = {
                blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600' },
                green: { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-600' },
                purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-600' }
              };
              const colors = colorMap[feature.color as keyof typeof colorMap];
              
              return (
                <div
                  key={index}
                  className="p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                >
                  <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </section>

      {/* Testimonial Section */}
      <TestimonialSection />

      {/* FAQ Section */}
      <FaqSection />
    </div>
  );
}

