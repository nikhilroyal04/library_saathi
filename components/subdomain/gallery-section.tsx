'use client';

import React from 'react';
import { Image as ImageIcon, Eye, Sparkles, ArrowRight } from 'lucide-react';

const GallerySection = () => {
  const galleryItems = [
    {
      id: 1,
      title: 'Modern Reading Space',
      description: 'Spacious reading areas with comfortable seating and natural lighting',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-300',
      icon: '📚',
      iconBg: 'bg-blue-100'
    },
    {
      id: 2,
      title: 'Digital Catalog System',
      description: 'Easy book search and management interface for members',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-300',
      icon: '💻',
      iconBg: 'bg-purple-100'
    },
    {
      id: 3,
      title: 'Member Services Desk',
      description: 'Dedicated help desk for member assistance and support',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-300',
      icon: '🛎️',
      iconBg: 'bg-green-100'
    },
    {
      id: 4,
      title: 'Quiet Study Zones',
      description: 'Peaceful study areas designed for focused learning',
      gradient: 'from-orange-500 to-amber-500',
      bgGradient: 'from-orange-50 to-amber-50',
      borderColor: 'border-orange-300',
      icon: '📖',
      iconBg: 'bg-orange-100'
    },
    {
      id: 5,
      title: 'Tech Integration',
      description: 'Modern technology for seamless library operations',
      gradient: 'from-indigo-500 to-blue-500',
      bgGradient: 'from-indigo-50 to-blue-50',
      borderColor: 'border-indigo-300',
      icon: '⚡',
      iconBg: 'bg-indigo-100'
    },
    {
      id: 6,
      title: 'Community Events',
      description: 'Regular workshops and community gatherings',
      gradient: 'from-rose-500 to-pink-500',
      bgGradient: 'from-rose-50 to-pink-50',
      borderColor: 'border-rose-300',
      icon: '🎉',
      iconBg: 'bg-rose-100'
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-3 py-1.5 mb-3 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 border-2 border-blue-200">
            <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              📸 Library Gallery
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3">
            Explore Our{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
              Library Spaces
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto font-medium">
            Take a virtual tour of our modern library facilities and see how we create the perfect learning environment
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-xl aspect-[4/3] bg-gradient-to-br ${item.bgGradient} border-2 ${item.borderColor} hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-85 group-hover:opacity-95 transition-opacity duration-300`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`p-6 rounded-2xl ${item.iconBg} bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-5xl opacity-80 group-hover:opacity-100 transition-opacity transform group-hover:rotate-6 duration-300">
                      {item.icon}
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated Background Pattern */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded-lg ${item.iconBg} bg-white/20 backdrop-blur-sm`}>
                      <ImageIcon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-base font-extrabold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-200 font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Top Badge */}
              <div className={`absolute top-4 right-4 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-lg text-xs font-extrabold text-gray-900 opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 flex items-center gap-1.5 shadow-lg`}>
                <Eye className="w-3.5 h-3.5" />
                View
              </div>

              {/* Corner Decorations */}
              <div className={`absolute top-0 left-0 w-20 h-20 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-25 rounded-br-full transition-opacity duration-300`}></div>
              <div className={`absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl ${item.gradient} opacity-0 group-hover:opacity-20 rounded-tl-full transition-opacity duration-300`}></div>

              {/* Bottom Accent Line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a
            href="#gallery"
            className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm"
          >
            View Full Gallery
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;

