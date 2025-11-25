'use client';

import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role?: string;
  library?: string;
  image?: string;
  rating?: number;
  text: string;
}

interface TestimonialSectionProps {
  testimonials?: Testimonial[];
}

const TestimonialSection = ({ testimonials: propTestimonials }: TestimonialSectionProps) => {
  // Default testimonials if no data provided
  const defaultTestimonials = [
    {
      name: 'Dr. Priya Sharma',
      role: 'Regular Member',
      library: 'Member since 2020',
      image: '👩‍💼',
      rating: 5,
      text: 'This library has been a wonderful place for my studies. The peaceful environment and helpful staff make it the perfect spot for reading and learning.'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Student Member',
      library: 'Member since 2021',
      image: '👨‍💼',
      rating: 5,
      text: 'The multiple shift timings are so convenient! I can visit the library at different times based on my schedule. The staff is always helpful and the collection is impressive.'
    },
    {
      name: 'Anita Desai',
      role: 'Regular Member',
      library: 'Member since 2019',
      image: '👩‍💻',
      rating: 5,
      text: 'I love this library! The book collection is extensive, the reading spaces are comfortable, and the staff goes above and beyond to help. Highly recommended!'
    },
    {
      name: 'Mohammed Ali',
      role: 'Regular Member',
      library: 'Member since 2022',
      image: '👨‍💻',
      rating: 5,
      text: 'The library facilities are excellent! The quiet study zones, modern reading spaces, and well-maintained books make it my favorite place to study and read.'
    }
  ];

  const testimonials = propTestimonials && propTestimonials.length > 0 ? propTestimonials : defaultTestimonials;

  // Duplicate testimonials for seamless scrolling
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) => {
    const colors = [
      { bg: 'bg-blue-50', border: 'border-blue-200' },
      { bg: 'bg-green-50', border: 'border-green-200' },
      { bg: 'bg-purple-50', border: 'border-purple-200' },
      { bg: 'bg-pink-50', border: 'border-pink-200' }
    ];
    const color = colors[index % colors.length];
    return (
    <div
      key={index}
      className={`bg-white rounded-lg border ${color.border} hover:border-blue-300 hover:shadow-lg transition-all duration-200 flex-shrink-0 w-[380px] p-6`}
    >
      {/* Rating Stars */}
      <div className="flex items-center gap-1 mb-3">
        {[...Array(testimonial.rating || 5)].map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 text-yellow-400 fill-current"
          />
        ))}
        <span className="ml-2 text-sm font-semibold text-gray-600">{testimonial.rating || 5}.0</span>
      </div>

      {/* Testimonial Text */}
      <p className="text-sm text-gray-700 mb-4 leading-relaxed">
        "{testimonial.text}"
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <div className={`w-12 h-12 ${color.bg} rounded-lg flex items-center justify-center text-xl`}>
          {testimonial.image || '👤'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-900 text-sm mb-0.5 truncate">
            {testimonial.name}
          </div>
          {testimonial.role && (
            <div className="text-xs text-gray-600 mb-0.5 truncate">
              {testimonial.role}
            </div>
          )}
          {testimonial.library && (
            <div className="text-xs text-gray-500 truncate">
              {testimonial.library}
            </div>
          )}
        </div>
      </div>
    </div>
    );
  };

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Loved by <span className="text-blue-600">Our Members</span>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our members who love spending time at our library
          </p>
        </div>

        {/* Marquee Container */}
        <div className="space-y-4 mb-10">
          {/* Row 1 - Scroll Left */}
          <div className="overflow-hidden">
            <div className="flex animate-marquee-left gap-4">
              {duplicatedTestimonials.map((testimonial, index) => (
                <TestimonialCard key={`left-${index}`} testimonial={testimonial} index={index} />
              ))}
            </div>
          </div>

          {/* Row 2 - Scroll Right */}
          <div className="overflow-hidden">
            <div className="flex animate-marquee-right gap-4">
              {duplicatedTestimonials.map((testimonial, index) => (
                <TestimonialCard key={`right-${index}`} testimonial={testimonial} index={index} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialSection;