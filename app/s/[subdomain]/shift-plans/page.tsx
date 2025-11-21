import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSubdomainData, getLibraryDetails } from '@/lib/subdomains';
import { Clock, Calendar, Users, RotateCcw, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';

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
      gradient: 'from-orange-400 via-amber-400 to-yellow-400',
      bgGradient: 'from-orange-50 to-amber-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      shadow: 'shadow-orange-200',
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
      gradient: 'from-yellow-400 via-orange-400 to-amber-400',
      bgGradient: 'from-yellow-50 to-orange-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-700',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      shadow: 'shadow-yellow-200',
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
      gradient: 'from-purple-400 via-pink-400 to-rose-400',
      bgGradient: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      shadow: 'shadow-purple-200',
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
      gradient: 'from-indigo-400 via-blue-400 to-cyan-400',
      bgGradient: 'from-indigo-50 to-blue-50',
      borderColor: 'border-indigo-200',
      textColor: 'text-indigo-700',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      shadow: 'shadow-indigo-200',
      description: 'Late-night study sessions for night owls and dedicated learners.',
      features: ['24/7 access available', 'Quiet night environment', 'Night study support', 'Limited staff'],
      status: 'limited',
      capacity: '45%',
      staffCount: 2
    }
  ];

  const features = [
    {
      icon: Users,
      title: 'Staff Assignment',
      description: 'Easily assign staff members to different shifts with drag-and-drop interface',
      color: 'blue'
    },
    {
      icon: Calendar,
      title: 'Calendar View',
      description: 'Visual calendar to see all shifts at a glance and manage schedules efficiently',
      color: 'green'
    },
    {
      icon: RotateCcw,
      title: 'Auto Rotation',
      description: 'Automatic shift rotation to ensure fair distribution of work hours',
      color: 'purple'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl mb-6">
            <Clock className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Library{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
              Shift Plans
            </span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto font-medium">
            Explore our shift schedules and find the perfect time to visit {libraryName}. Each shift offers unique benefits and facilities.
          </p>
        </div>

        {/* Shifts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {shifts.map((shift, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden bg-gradient-to-br ${shift.bgGradient} rounded-2xl border-2 ${shift.borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${shift.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
              
              {/* Decorative corner */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${shift.gradient} opacity-0 group-hover:opacity-20 rounded-bl-full transition-opacity duration-300`}></div>
              
              <div className="relative p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-4 rounded-xl ${shift.iconBg} group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    <span className="text-5xl">{shift.icon}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {shift.status === 'active' ? (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 rounded-full border-2 border-green-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs font-bold text-green-700 uppercase">Active</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 rounded-full border-2 border-yellow-200">
                        <AlertCircle className="w-3 h-3 text-yellow-600" />
                        <span className="text-xs font-bold text-yellow-700 uppercase">Limited</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className="text-lg font-extrabold text-gray-900 mb-2 group-hover:scale-105 transition-transform duration-300">
                    {shift.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className={`w-5 h-5 ${shift.iconColor}`} />
                    <span className={`text-base font-bold ${shift.textColor}`}>
                      {shift.time}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium leading-relaxed mb-4">
                    {shift.description}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Features:</h4>
                  <ul className="space-y-2">
                    {shift.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className={`w-4 h-4 ${shift.iconColor} flex-shrink-0`} />
                        <span className="text-sm text-gray-700 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t-2 border-gray-200">
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase mb-1">Capacity</p>
                    <p className={`text-lg font-extrabold ${shift.textColor}`}>{shift.capacity}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase mb-1">Staff</p>
                    <p className={`text-lg font-extrabold ${shift.textColor}`}>{shift.staffCount} Members</p>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${shift.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-3 py-1.5 mb-3 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 border-2 border-blue-200">
              <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                Shift Management Features
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3">
              Powerful{' '}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
                Management Tools
              </span>
            </h2>
            <p className="text-gray-600 font-medium">Streamline your library operations with our advanced shift management system</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colorClasses = {
                blue: 'from-blue-100 to-cyan-100 border-blue-200 hover:border-blue-300 text-blue-600',
                green: 'from-green-100 to-emerald-100 border-green-200 hover:border-green-300 text-green-600',
                purple: 'from-purple-100 to-pink-100 border-purple-200 hover:border-purple-300 text-purple-600'
              };
              
              return (
                <div
                  key={index}
                  className="group p-6 bg-white rounded-xl border-2 border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses[feature.color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border-2`}>
                    <Icon className={`w-8 h-8 ${colorClasses[feature.color as keyof typeof colorClasses].split(' ')[4]}`} />
                  </div>
                  <h4 className="text-lg font-extrabold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-blue-600 via-cyan-600 to-sky-600 rounded-2xl p-8 text-center border-2 border-blue-500 shadow-xl">
          <h3 className="text-lg font-extrabold text-white mb-3">
            Ready to Plan Your Visit?
          </h3>
          <p className="text-blue-100 font-medium mb-6 max-w-2xl mx-auto">
            Book your appointment now and experience our library facilities during your preferred shift time.
          </p>
          <Link
            href="/book-now"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-extrabold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Calendar className="w-5 h-5" />
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}

