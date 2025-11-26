'use client';

import { Clock, Calendar, Users, RotateCcw } from 'lucide-react';

interface Shift {
  name: string;
  time: string;
  icon?: string;
  color?: string;
  description?: string;
  features?: string[];
  status?: string;
  capacity?: string;
  staffCount?: number;
}

interface ShiftPlanSectionProps {
  shifts?: Shift[];
}

const ShiftPlanSection = ({ shifts: propShifts }: ShiftPlanSectionProps) => {
  // Map icon names to emojis
  const getIconEmoji = (icon?: string): string => {
    if (!icon) return '📚';
    
    // If it's already an emoji (contains emoji characters), return as is
    const emojiPattern = /[\p{Emoji}]/u;
    if (emojiPattern.test(icon)) {
      return icon;
    }
    
    // Map text names to emojis
    const iconMap: Record<string, string> = {
      'sun': '☀️',
      'sunrise': '🌅',
      'moon': '🌙',
      'morning': '🌅',
      'afternoon': '☀️',
      'evening': '🌆',
      'night': '🌙',
      'dawn': '🌅',
      'dusk': '🌆',
      'day': '☀️',
      'stars': '⭐',
      'book': '📚',
      'library': '📖',
      'clock': '🕐',
      'time': '⏰'
    };
    
    const iconLower = icon.toLowerCase().trim();
    return iconMap[iconLower] || icon; // Return mapped emoji or original if not found
  };

  // Default shifts if no data provided
  const defaultShifts: Shift[] = [
    {
      name: 'Morning Shift',
      time: '8:00 AM - 12:00 PM',
      icon: '🌅'
    },
    {
      name: 'Afternoon Shift',
      time: '12:00 PM - 4:00 PM',
      icon: '☀️'
    },
    {
      name: 'Evening Shift',
      time: '4:00 PM - 8:00 PM',
      icon: '🌆'
    },
    {
      name: 'Night Shift',
      time: '8:00 PM - 12:00 AM',
      icon: '🌙'
    }
  ];

  const shifts = propShifts && propShifts.length > 0 ? propShifts : defaultShifts;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Our <span className="text-blue-600">Library Shifts</span>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            We operate in multiple shifts throughout the day to serve you better. Choose the time that works best for you and visit us during your preferred shift.
          </p>
        </div>

        {/* Shifts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {shifts.map((shift, index) => {
            const colors = [
              { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'text-orange-600' },
              { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: 'text-yellow-600' },
              { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-600' },
              { bg: 'bg-indigo-50', border: 'border-indigo-200', icon: 'text-indigo-600' }
            ];
            const color = colors[index % colors.length];
            return (
            <div
              key={index}
              className={`bg-white rounded-lg border ${color.border} hover:border-blue-300 hover:shadow-lg transition-all duration-200 p-6`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 ${color.bg} rounded-lg`}>
                  <span className="text-2xl">{getIconEmoji(shift.icon)}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {shift.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Clock className={`w-4 h-4 ${color.icon}`} />
                    <span className="text-sm font-medium text-gray-600">
                      {shift.time}
                    </span>
                  </div>
                  {shift.capacity && (
                    <div className="text-xs text-gray-500 mt-1">
                      Capacity: {shift.capacity}
                    </div>
                  )}
                </div>
              </div>
              {shift.description && (
                <p className="text-sm text-gray-600 mt-2">{shift.description}</p>
              )}
            </div>
            );
          })}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Dedicated Staff</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Our experienced staff members are available during each shift to assist you with all your library needs
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Flexible Timing</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Visit us at any time during our operating hours. We have shifts throughout the day to accommodate your schedule
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
              <RotateCcw className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Consistent Service</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              We maintain consistent quality of service across all shifts, ensuring you have a great experience whenever you visit
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShiftPlanSection;