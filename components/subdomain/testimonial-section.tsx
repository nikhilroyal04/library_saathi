'use client';

import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';

const TestimonialSection = () => {
  const testimonials = [
    {
      name: 'Dr. Priya Sharma',
      role: 'Head Librarian',
      library: 'City Central Library',
      image: '👩‍💼',
      rating: 5,
      text: 'Library Saathi has transformed how we manage our library. The local database gives us complete control, and the interface is so intuitive that our staff learned it in minutes.',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Library Administrator',
      library: 'University Library',
      image: '👨‍💼',
      rating: 5,
      text: 'The shift planning feature is a game-changer! We can now manage multiple shifts effortlessly. The security aspect of local storage was the deciding factor for us.',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      name: 'Anita Desai',
      role: 'Library Manager',
      library: 'Community Library',
      image: '👩‍💻',
      rating: 5,
      text: 'We love how comprehensive this system is. From member management to expense tracking, everything we need is in one place. Highly recommended!',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      name: 'Mohammed Ali',
      role: 'IT Coordinator',
      library: 'Tech Institute Library',
      image: '👨‍💻',
      rating: 5,
      text: 'As someone who values data security, Library Saathi is perfect. No cloud dependency means no worries about data breaches. The performance is excellent too!',
      gradient: 'from-orange-500 to-amber-500',
      bgGradient: 'from-orange-50 to-amber-50',
      borderColor: 'border-orange-200',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    }
  ];

  // Duplicate testimonials for seamless scrolling
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) => (
    <div
      key={index}
      className={`group relative overflow-hidden bg-gradient-to-br ${testimonial.bgGradient} rounded-xl border-2 ${testimonial.borderColor} hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex-shrink-0 w-[400px]`}
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
      
      {/* Decorative corner element */}
      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-15 rounded-bl-full transition-opacity duration-300`}></div>
      
      <div className="relative z-10 p-4">
        {/* Quote Icon */}
        <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-30 transition-opacity">
          <Quote className={`w-8 h-8 ${testimonial.iconColor}`} />
        </div>

        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star
              key={i}
              className="w-3.5 h-3.5 text-yellow-400 fill-current group-hover:scale-110 transition-transform duration-300"
              style={{ transitionDelay: `${i * 50}ms` }}
            />
          ))}
          <span className="ml-1.5 text-xs font-bold text-gray-500">5.0</span>
        </div>

        {/* Testimonial Text */}
        <p className="text-xs md:text-sm text-gray-700 mb-3 leading-relaxed font-medium relative z-10 pr-6 line-clamp-3">
          <span className="text-xl text-gray-300 font-serif leading-none mr-0.5">"</span>
          {testimonial.text}
          <span className="text-xl text-gray-300 font-serif leading-none ml-0.5">"</span>
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-3 pt-2 border-t-2 border-white/50">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform duration-300 ring-2 ring-white/50`}>
            {testimonial.image}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-extrabold text-gray-900 text-sm mb-0.5 truncate">
              {testimonial.name}
            </div>
            <div className="text-xs font-bold text-gray-600 mb-0.5 truncate">
              {testimonial.role}
            </div>
            <div className="flex items-center gap-1.5">
              <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${testimonial.gradient} flex-shrink-0`}></div>
              <span className="text-xs text-gray-500 font-medium truncate">
                {testimonial.library}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${testimonial.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
      </div>
    </div>
  );

  return (
    <section className="py-12 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-3 py-1.5 mb-3 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 border-2 border-blue-200">
            <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              💬 What Our Users Say
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
              Librarians Everywhere
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto font-medium">
            Don't just take our word for it - hear from librarians who have transformed their operations with Library Saathi
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